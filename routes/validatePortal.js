const express = require("express")
const Admin = require("../models/AdminSchema")

const app = express.Router();

app.post("/validate", async (req,res)=> {
    const {email, code} = req.body;
    try {
        const admin = await Admin.findOne({email})
        if(!admin) return res.status(404).send({Message: "Cannot find admin with that email", Success: false})
        if(admin.code !== code) return res.status(400).send({Message: "Incorrect code", Success: false, Redirect: true})
        if(admin.code === code )return res.send({Message: "Code Validated", Success: true, Redirect: false})
        return res.status(400).send({Message: "Unknown error occured", Success: false})
    } catch (error) {
        console.error("Error setting admin code: ", error)
        return res.status(500).send({Message: "Server Error", Success: false})
    }
})

module.exports = app;
