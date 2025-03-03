const express = require("express");
const Veteran = require("../models/VeteranSchema");
const Selection = require("../models/SelectionSchema");
const {sendEmailNotification} = require("../utils/Mailer")

const app = express.Router();

app.post("/select", async (req, res) => {
    const { name, email, vet_id, province, city } = req.body;
    
    try {
        // Create a new selection record
        const selection = new Selection({
            name,
            email,
            location: {
                province,
                city,
            },
            veteran: vet_id,
        });

        console.log(selection)

        await selection.save();

        // Update the veteran document to set 'taken' to true
        const updatedVeteran = await Veteran.findByIdAndUpdate(
            vet_id,
            { taken: true },
            { new: true }
        );

        if (!updatedVeteran) {
            return res.status(404).send({ Message: "Veteran not found", Success: false });
        }
        const vet = await Veteran.findById(vet_id)

        sendEmailNotification(email, name, vet, `You have selected: ${vet.name}`, "student")
        sendEmailNotification(email, name, vet, `New Research Selection: ${name} is now researching ${vet.name}`, "prof")

        return res.send({ Message: "Congratulations! Veteran selected.", Success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ Message: "Server error occurred", Success: false });
    }
});

module.exports = app;
