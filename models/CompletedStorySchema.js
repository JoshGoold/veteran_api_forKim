const mongoose = require("mongoose")

const StorySchema = mongoose.Schema({
    link: {type: String, required: true},
    img: {type: Buffer, required: true},
    summary: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    veteran: {type: mongoose.SchemaTypes.ObjectId, ref: "Veteran"}
})

module.exports = mongoose.model("Story", StorySchema)