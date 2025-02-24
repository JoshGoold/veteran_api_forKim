const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const route = require("./routes/uploadManyVeterans")
const getRoute = require("./routes/createDocument")
const getRoute2 = require("./routes/getAllData")

const select = require("./routes/handleResearchSelection")
require("dotenv").config()

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(cors({origin: ["https://vet-website-eight.vercel.app", "https://vet-website-eight.vercel.app/", "http://localhost:3000"]}))
app.use(express.json())
app.use("/", route)
app.use("/", getRoute)
app.use("/", getRoute2)

app.use("/", select)


mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("Database connected")
    app.listen(process.env.PORT, ()=> console.log(`http://localhost:${process.env.PORT}`))
})
.catch(e=> console.error(e))

app.get("/", (req,res)=>{
    res.send("API FOR VETERANS")
})

module.exports = app;