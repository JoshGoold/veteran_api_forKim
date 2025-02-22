const express = require("express")
const Veteran = require("../models/VeteranSchema")
const buildDocument = require("../utils/createDocument")

const app = express.Router()

app.get("/create-document", async (req,res)=> {
    try {
        const data = await Veteran.find({});
        if(!data) return res.status(404).send({Message: "No data found", Success: false})
            await buildDocument(data)
        return res.send({Message: "Data created", Success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Server error occured", Success: false})
    }
})

module.exports = app;