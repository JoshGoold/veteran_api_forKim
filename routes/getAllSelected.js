const express = require("express")
const Selected = require("../models/SelectionSchema")

const app = express.Router()

app.get("/get-all-selected", async (req,res)=> {
    try {
        const data = await Selected.find({}).populate("veteran");
        if(!data) return res.status(404).send({Message: "No data found", Success: false})
        return res.send({Message: "Data fetched", Data: data, Success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Server error occured", Success: false})
    }
})

module.exports = app;