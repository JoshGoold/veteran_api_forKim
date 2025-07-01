const express = require("express");
const News = require("../models/NewsSchema");
const Lesson = require("../models/LessonPlanSchema");
const Story = require("../models/CompletedStorySchema");
const multer = require("multer");

const app = express.Router();


const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload-material", upload.single("img"), async (req, res) => {
  const { link, summary, material, vet } = req.body;
  const img = req.file?.buffer; 

  // Validation
  if (!link || !img || !summary || !material) {
    return res.status(400).send({ Message: "Missing required field", Success: false });
  }

  try {

    let doc;
    switch (material) {
      case "Lesson": 
        doc = new Lesson({ link, img, summary, material });
        await doc.save();
        break;
      case "Story": 
        doc = new Story({ link, img, summary, material, vet });
        await doc.save();
        break;
      case "News":
        doc = new News({ link, img, summary, material });
        await doc.save();
        break;
      default:
        return res.status(400).send({ Message: "Invalid material type", Success: false });
    }

    return res.status(200).send({ Message: "Upload Complete", Success: true });
  } catch (error) {
    console.error("Error uploading material:", error);
    return res.status(500).send({ Message: "Server Error Occurred", Success: false });
  }
});

module.exports = app;