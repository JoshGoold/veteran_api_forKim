const express = require("express");
const Admin = require("../models/AdminSchema");
const bcrypt = require("bcrypt");
const { sendTwoFactorAuth } = require("../utils/Mailer");
const generateCode = require("../utils/genCode");

const app = express.Router();

app.post("/validate", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ Message: "Email and password are required", Success: false });
    }

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).send({ Message: "Invalid credentials", Success: false });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).send({ Message: "Invalid credentials", Success: false });
        }

        const code = generateCode();
        try {
            await sendTwoFactorAuth(email, code, `Two Factor Auth Code (${code})`, "");
        } catch (emailError) {
            console.error("Error sending 2FA email: ", emailError);
            return res.status(500).send({ Message: "Failed to send 2FA code", Success: false });
        }

        return res.send({ Message: "Admin validated, 2FA code sent", Success: true });
    } catch (error) {
        console.error("Error setting admin code: ", error);
        return res.status(500).send({ Message: "Server Error", Success: false });
    }
});

module.exports = app;