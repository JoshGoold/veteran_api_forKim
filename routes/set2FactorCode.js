const express = require("express")
const Admin = require("../models/AdminSchema")

const app = express.Router();

app.post("/validate-code", async (req,res)=> {
    const {email, code} = req.body;
    try {
        const admin = await Admin.findOne({email})
        if(!admin) return res.status(404).send({Message: "Cannot find admin with that email", Success: false})
        admin.code = Number(code);
        await admin.save()
        return res.send({Message: "Code set successfully", Success: true})
    } catch (error) {
        console.error("Error setting admin code: ", error)
        return res.status(500).send({Message: "Server Error", Success: false})
    }
})

module.exports = app;