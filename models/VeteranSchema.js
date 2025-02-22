const mongoose = require("mongoose")

const VeteranSchema = mongoose.Schema({
    name: {type: String, required: true},
    from: {type: String, required: true},
    death: {type: String, required: true},
    squadron: {type: String, required: true},
    inscribed: {type: String, required: true},
    grave: {type: String, required: true},
    taken: {type: Boolean, default: false},
    full_description: {type: String, required: true}
})

module.exports = mongoose.model("Veteran", VeteranSchema)