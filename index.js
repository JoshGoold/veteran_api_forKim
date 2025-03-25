const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const route = require("./routes/uploadManyVeterans")
const getRoute = require("./routes/createDocument")
const getRoute2 = require("./routes/getAllData")
const getRoute3 = require("./routes/getCoords")
const getRoute4 = require("./routes/getAllSelected")
const postRoute = require("./routes/createAdmin")
const postRoute2 = require("./routes/set2FactorCode")
const postRoute3 = require("./routes/validatePortal")
const postRoute4 = require("./routes/validateEmail")




const select = require("./routes/handleResearchSelection")
require("dotenv").config()

const app = express()
app.use(cors({
    origin: ["http://localhost:3000", "https://vet-website-eight.vercel.app","http://localhost:3000/", "https://vet-website-eight.vercel.app/"]
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json({ limit: "10mb" }))
app.use("/", route)
app.use("/", getRoute)
app.use("/", getRoute2)
app.use("/", getRoute3)
app.use("/", getRoute4)
app.use("/", postRoute2)
app.use("/", postRoute3)
app.use("/", postRoute4)

app.use("/", postRoute)


app.use("/", select)

// Function to connect to MongoDB
const connectDB = async () => {
    // Check the current connection state
    if (mongoose.connection.readyState === 1) {
        console.log("Database already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout for server selection
            maxPoolSize: 10, // Connection pool size (adjust based on your needs)
        });
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error; // Let the caller handle the error
    }
};

// Middleware to ensure DB connection for each API call
const ensureDBConnection = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({ error: "Database connection failed" });
    }
};

// Apply the middleware to all routes
app.use(ensureDBConnection);

app.listen(process.env.PORT, ()=> console.log(`http://localhost:${process.env.PORT}`))


app.get("/", (req,res)=>{
    res.send("API FOR VETERANS")
})

module.exports = app;