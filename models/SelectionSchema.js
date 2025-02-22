const mongoose = require("mongoose")

const SelectionSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    location: {
       province: {type: String, required: true},
       city: {type: String, required: true} 
    },
    veteran: {type: mongoose.SchemaTypes.ObjectId, ref: "Veteran", unique: true},
    createdAt: {type: Date, default: Date.now()}
})

module.exports = mongoose.model("Selection", SelectionSchema)