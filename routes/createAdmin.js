const express = require("express")
const Admin = require("../models/AdminSchema")
const hash = require("../utils/hash")

const app = express.Router()

app.post("/create-admin", async (req,res)=> {
    const {email, password} = req.body;
    try {
        const data = await Admin.findOne({email});
        if(data?._id) {
            return res.status(400).send({Message: "Email is already in use", Success: false})
        }
        const hashedPassword = await hash(password)
        const admin = new Admin({
            email,
            password: hashedPassword
        })
        await admin.save()
        return res.send({Message: "Registered Successfully", Success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Server error occured", Success: false})
    }
})

module.exports = app;