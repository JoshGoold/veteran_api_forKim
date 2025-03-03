
async function getCoordinates(data) {
    let coords = new Map();

    for (let veteran of data) { 
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(veteran.from)}`, 
                { method: "GET", headers: { "Content-Type": "application/json" } }
            );

            if (!response.ok) {
                throw new Error(`Response failed: ${response.statusText}`);
            }

            const locationData = await response.json();
            
            if (locationData.length > 0) {  // Ensure there is at least one result
                const firstResult = locationData[0];
                console.log(firstResult)
                if (!coords.has(veteran.from)) {
                    coords.set(veteran.from, [firstResult.lat, firstResult.lon]);
                }
            }
        } catch (error) {
            console.error(`Error fetching coordinates for ${veteran.from}:`, error);
        }
    }

    return coords; // Return the map
}

module.exports = getCoordinates;
