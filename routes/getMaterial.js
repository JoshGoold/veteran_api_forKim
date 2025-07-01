const express = require("express");
const News = require("../models/NewsSchema");
const Lesson = require("../models/LessonPlanSchema");
const Story = require("../models/CompletedStorySchema");


const app = express.Router();



app.get("/get-news", async (req, res) => {
    try {
        const news = await News.find({})
        if(!news || news.length === 0){
            return res.status(404).send({Message: "No news uploaded yet.", Success: false})
        }
        return res.send({News: news, Success: true})
    } catch (error) {
        console.error("error fetching news: ",error)
        res.status(500).send({Message: "server error occured while fetching news", Success: false})
    }

});

app.get("/get-lessons", async (req, res) => {
    try {
        const lessons = await Lesson.find({})
        if(!lessons || lessons.length === 0){
            return res.status(404).send({Message: "No lessons uploaded yet.", Success: false})
        }
        return res.send({Lessons: lessons, Success: true})
    } catch (error) {
        console.error("error fetching lessons: ",error)
        res.status(500).send({Message: "server error occured while fetching lessons", Success: false})
    }

});

app.get("/get-story", async (req, res) => {
    try {
        const stories = await Story.find({}).populate("veteran")
        if(!stories || stories.length === 0){
            return res.status(404).send({Message: "No stories uploaded yet.", Success: false})
        }
        return res.send({Stories: stories, Success: true})
    } catch (error) {
        console.error("error fetching stories: ",error)
        res.status(500).send({Message: "server error occured while fetching stories", Success: false})
    }

});

module.exports = app;