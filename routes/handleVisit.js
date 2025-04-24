// routes/visitor.js
const express = require("express");
const Visitor = require("../models/VisitorSchema");

const router = express.Router();

router.post("/visit", async (req, res) => {
    try {
        const {pageVisited} = req.body;
        // Extract data from req
        const ip = req.headers['x-forwarded-for'] || req.ip; 
        const referrer = req.headers['referer'] || 'direct'; 
        const userAgent = req.headers['user-agent'] || '';
        
        let deviceType = 'unknown';
        if (userAgent.includes('Mobile')) {
            deviceType = 'mobile';
        } else if (userAgent.includes('Tablet')) {
            deviceType = 'tablet';
        } else {
            deviceType = 'desktop';
        }

        const visitor = new Visitor({
            deviceType,
            ip,
            referrer ,
            pageVisited
        });

        // Save to MongoDB
        await visitor.save();

        // Respond with success
        res.status(201).send({ Message: "Visitor logged successfully", visitor, Success: true });
    } catch (error) {
        console.error("Error logging visitor:", error);
        res.status(500).send({ Message: "Failed to log visitor", Success: false});
    }
});

router.get("/visitors", async (req,res)=> {
    try {
        const v = await Visitor.find({})
        if(!v || v.length === 0) return res.status(404).send({Message: "No visitors logged", Success: false})
        return res.send({Message: "Visitors Located", Visitors: v, Success: true}) 
    } catch (error) {
        console.error(error)
        res.status(500).send({Message: error.message, Success: false})
    }
})

module.exports = router;