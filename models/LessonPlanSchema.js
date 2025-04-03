const mongoose = require("mongoose")

const LessonSchema = mongoose.Schema({
    link: {type: String, required: true},
    img: {type: Buffer, required: true},
    summary: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()}
})

module.exports = mongoose.model("Lesson", LessonSchema)