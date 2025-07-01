const express = require("express");
const Story = require("../models/CompletedStorySchema");

const app = express.Router();

function assemble(data) {
  const provinces = new Set([
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
  ]);

  // Initialize provinceTotals dynamically
  let provinceTotals = {};
  provinces.forEach((province) => {
    provinceTotals[province] = 0;
  });

  let grouped = {};
  data.forEach((doc) => {
    // Validate doc.from
    if (!doc.from || typeof doc.from !== "string") {
      return; // Skip invalid documents
    }

    const parts = doc.from.split(",");
    const city = parts.length > 1 ? parts[0].trim() : "Unknown City";
    let region = parts[parts.length - 1].trim();

    // Normalize region case for matching
    region = region.charAt(0).toUpperCase() + region.slice(1).toLowerCase();

    if (provinces.has(region)) {
      if (!grouped[region]) {
        grouped[region] = {};
      }
      if (!grouped[region][city]) {
        grouped[region][city] = [];
      }
      grouped[region][city].push(doc);

      // Update total count for the province
      provinceTotals[region] += 1;
    }
  });

  return { grouped, provinceTotals };
}

app.get("/assemble-stories", async (req, res) => {
  try {
    const completed_stories = await Story.find({}).lean(); // Use lean for performance
    if (completed_stories.length === 0) {
      return res.status(404).send({
        Message: "No completed stories found",
        Output: 0,
        Success: false,
      });
    }

    const { grouped, provinceTotals } = assemble(completed_stories);

    // Check if grouped is empty
    if (Object.keys(grouped).length === 0) {
      return res.status(404).send({
        Message: "No stories could be grouped by province",
        Output: 0,
        Success: false,
      });
    }

    return res.send({
      Message: "Stories successfully grouped",
      Stories: grouped,
      Totals: provinceTotals,
      Success: true,
    });
  } catch (error) {
    return res.status(500).send({
      Message: "Server error",
      EventTargetrror: error.message,
      Success: false,
    });
  }
});

module.exports = app;