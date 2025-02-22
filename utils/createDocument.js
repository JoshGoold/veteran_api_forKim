const path = require("path");
const fs = require("fs");

const basePath = path.join(__dirname, "..", "documents");

const provinces = new Set([
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland",
  "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"
]);

const territories = new Set(["Northwest Territories", "Nunavut", "Yukon"]);

async function buildDocument(data) {
  const grouped = { Territories: {} };
  const nonCanadian = {};

  data.forEach(doc => {
    const parts = doc.from.split(",");
    const city = parts.length > 1 ? parts[0].trim() : "Unknown City";
    const region = parts[parts.length - 1].trim();

    if (territories.has(region)) {
      if (!grouped["Territories"][city]) {
        grouped["Territories"][city] = [];
      }
      grouped["Territories"][city].push(doc);
    } else if (provinces.has(region)) {
      if (!grouped[region]) {
        grouped[region] = {};
      }
      if (!grouped[region][city]) {
        grouped[region][city] = [];
      }
      grouped[region][city].push(doc);
    } else {
      if (!nonCanadian[region]) {
        nonCanadian[region] = {};
      }
      if (!nonCanadian[region][city]) {
        nonCanadian[region][city] = [];
      }
      nonCanadian[region][city].push(doc);
    }
  });

  // Function to write grouped data to a file
  async function writeToFile(filename, regionData) {
    let output = "";
    let totalRegionCount = 0;
    Object.keys(regionData).sort().forEach(city => {
      const count = regionData[city].length;
      totalRegionCount += count;
      output += `--- ${city} (${count} people) ---\n`;
      regionData[city].forEach(doc => {
        output += doc.full_description + "\n\n";
      });
    });
    output = `Total: ${totalRegionCount} people\n\n` + output;
    
    const filePath = path.join(basePath, `${filename}.txt`);
    try {
      await fs.promises.writeFile(filePath, output, "utf8");
      console.log(`Document written to ${filePath}`);
    } catch (error) {
      console.error(`Error writing file ${filename}:`, error);
    }
  }

  // Write files for each province
  for (const province in grouped) {
    await writeToFile(province, grouped[province]);
  }

  // Write file for non-Canadian countries
  await writeToFile("Non-Canadian", nonCanadian);
}

module.exports = buildDocument;