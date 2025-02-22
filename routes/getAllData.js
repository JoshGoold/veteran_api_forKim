const express = require("express")
const Veteran = require("../models/VeteranSchema")

const app = express.Router()

app.get("/get-all-data", async (req,res)=> {
    try {
        const data = await Veteran.find({});
        if(!data) return res.status(404).send({Message: "No data found", Success: false})
        return res.send({Message: "Data fetched", Data: data, Success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Server error occured", Success: false})
    }
})

module.exports = app;