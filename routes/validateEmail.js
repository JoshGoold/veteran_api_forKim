const express = require("express")
const Selection = require("../models/SelectionSchema")

const app = express.Router()

app.post("/validate", async (req,res)=> {
    const {email} = req.body;
    try {
        const user = await Selection.findOne({email: email});
        if(!user) return res.status(404).send({Message: "That email has not been used", Success: false})
        return res.send({Message: "Validated", Success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Server error occured", Success: false})
    }
})

module.exports = app;