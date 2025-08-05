const express = require("express");
const News = require("../models/NewsSchema");
const Lesson = require("../models/LessonPlanSchema");
const Veteran = require("../models/VeteranSchema")
const Story = require("../models/CompletedStorySchema");
const multer = require("multer");

const app = express.Router();


const upload = multer({ storage: multer.memoryStorage() });

app.put("/edit-material", upload.single("img"), async (req, res) => {
    const {material, summary, link, id} = req.body;
    const img = req?.file?.buffer;
    try {
    switch(material){
        case "Story":
            const story = await Story.findById(id)
            if(!story) return res.status(404).send({Message: "No story found", Success: false})
                story.summary = summary;
                story.link = link;
                story.img = img ? img : story.img;
                await story.save()
            break;
        case "Lesson":
            const lesson = await Lesson.findById(id)
            if(!lesson) return res.status(404).send({Message: "No lesson found", Success: false})
                lesson.summary = summary;
                lesson.link = link;
                lesson.img = img ? img : lesson.img;
                await lesson.save()
            break;
        case "News":
            const news = await News.findById(id)
            if(!news) return res.status(404).send({Message: "No news found", Success: false})
                news.summary = summary;
                news.link = link;
                news.img = img ? img : news.img;
                await news.save()
            break;
    }
    return res.send({Message: "Updated Document Successfully", Success: false})
    } catch (error) {
        return res.status(500).send({Message: "Error occured at /edit-material", Error: error.message, Success: false})
    }
});

app.delete("/delete-material", async (req, res) => {
    const {material, id} = req.body;
    try {
        switch(material){
        case "Story":
            await Story.findByIdAndDelete(id)        
            break;
        case "Lesson":
            await Lesson.findByIdAndDelete(id)
            break;
        case "News":
            await News.findByIdAndDelete(id)
            break;
    }
    return res.send({Message: "Successfully Deleted", Success: true})
    } catch (error) {
        return res.status(500).send({Message: "Error occured at /delete-material route", Error: error.message, Success: false})
    }
});

module.exports = app;