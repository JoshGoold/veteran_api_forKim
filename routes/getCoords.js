const express = require("express")
const coordinatesToFile = require("../utils/coordinatesToFile")
const app = express.Router()

app.get("/get-coords", async (req,res)=> {
    try {
        const completed = await coordinatesToFile();
        if(!completed) return res.status(400).send({Message: "Failed to write coords to file", Success: false})
        return res.send({Message: "Coordinates Document Created", Success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Server error occured", Success: false})
    }
})

module.exports = app;