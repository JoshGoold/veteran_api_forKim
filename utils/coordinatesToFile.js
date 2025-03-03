const getCoordinates = require("./getCoordinates.js");  // ✅ Import properly
const fs = require("fs");
const path = require("path");

console.log("getCoordinates:", getCoordinates);  // ✅ This should log [Function: getCoordinates]

async function coordinatesToFile() {
    const basePath = path.join(__dirname, "..", "documents");
    const filePath = path.join(basePath, "coords.geojson"); // Use .geojson for clarity

    try {
        // Ensure the documents directory exists
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true });
        }

        // Fetch data from API
        const response = await fetch("http://localhost:3900/get-all-data", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            return false

        }

        const data = await response.json();

        if (!data.Success) {
            return false

        }

        // Get coordinates
        const coordinates = await getCoordinates(data.Data);  // ✅ Use the function correctly

        // Create a GeoJSON feature collection
        const geojson = {
            type: "FeatureCollection",
            features: []
        };

        // Add each location as a GeoJSON feature
        for (const [key, coords] of coordinates.entries()) {
            geojson.features.push({
                type: "Feature",
                properties: { link: `/map/${key}` },
                geometry: {
                    type: "Point",
                    coordinates: [parseFloat(coords[1]), parseFloat(coords[0]), 0.0] // Correct order: [lon, lat, 0.0]
                }
            });
        }

        // Write GeoJSON to file
        await fs.promises.writeFile(filePath, JSON.stringify(geojson, null, 2), "utf-8");

        console.log("GeoJSON file saved successfully.");
        return true
    } catch (error) {
        console.error("Error:", error);
        return false
    }
}

module.exports = coordinatesToFile;
