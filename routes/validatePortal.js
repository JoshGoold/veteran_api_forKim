const express = require("express")
const Admin = require("../models/AdminSchema")
const bcrypt = require("bcrypt")
const {sendTwoFactorAuth} = require("../utils/Mailer")
const generateCode = require('../utils/genCode')

const app = express.Router();

app.post("/validate", async (req,res)=> {
    const {email, password} = req.body;
    try {
        const admin = await Admin.findOne({email})
        if(!admin) return res.status(404).send({Message: "Cannot find admin with that email", Success: false})
        const isMatch = await bcrypt.compare(admin.password, password);
        if(isMatch){
            const code = generateCode()
            await sendTwoFactorAuth(email, code, `Two Factor Auth Code (${code})`, "")
            return res.send({Message: "Admin validated", Success: true, Code: code})
        }
            
        return res.status(400).send({Message: "Unknown error occured", Success: false})
    } catch (error) {
        console.error("Error setting admin code: ", error)
        return res.status(500).send({Message: "Server Error", Success: false})
    }
})

module.exports = app;
