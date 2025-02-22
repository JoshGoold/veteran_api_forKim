const express = require("express");
const parseData = require("../utils/parseData");
const Veteran = require("../models/VeteranSchema");

const app = express.Router();

app.post("/upload-many-veterans", async (req, res) => {
    const { data } = req.body;

    try {
        const veterans = await parseData(data);
        if (!veterans || veterans.length === 0) {
            return res.status(404).send({ Message: "No veterans found", Success: false });
        }

        await Veteran.insertMany(veterans);
        res.send({ Message: "Documents uploaded", Success: true });
    } catch (error) {
        console.error("Error uploading veterans:", error.message); 
        res.status(500).send({ Message: 'Server error occurred', Success: false });
    }
});

module.exports = app;
