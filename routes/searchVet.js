const express = require("express");
const Veteran = require("../models/VeteranSchema");

const app = express.Router();

app.post("/search", async (req, res) => {
    const { name, page = 1, limit = 20 } = req.body;
    
    try {
        // Ensure limit doesn't exceed 20
        const pageLimit = Math.min(parseInt(limit), 20);
        const pageNumber = parseInt(page);
        
        // Calculate skip value for pagination
        const skip = (pageNumber - 1) * pageLimit;

        // Create search query
        const query = name ? { name: { $regex: name, $options: 'i' } } : {};

        // Fetch paginated results and total count
        const [vets, totalCount] = await Promise.all([
            Veteran.find(query)
                .skip(skip)
                .limit(pageLimit)
                .lean(),
            Veteran.countDocuments(query)
        ]);

        // Calculate pagination metadata
        const totalPages = Math.ceil(totalCount / pageLimit);
        
        res.send({
            Success: true,
            Data: vets,
            Pagination: {
                currentPage: pageNumber,
                totalPages,
                totalResults: totalCount,
                resultsPerPage: pageLimit
            }
        });
    } catch (error) {
        res.status(500).send({
            Success: false,
            Message: "Server error",
            Error: error.message
        });
    }
});

module.exports = app;