const mongoose = require("mongoose")

const VisitorSchema = mongoose.Schema({
    deviceType: {type: String},
    ip: {type: String},
    pageVisited: {type: String},
    referrer: {type: String},
    createdAt: {type: Date, default: new Date.now}
})


module.exports = mongoose.model("Visitor", VisitorSchema)