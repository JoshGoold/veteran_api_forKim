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
let cachedConnection = null;  
const connectDB = async () => {     
// Return cached connection if it exists and is still valid     
if (cachedConnection) {         
    console.log("Using cached database connection");         
    return cachedConnection;     
}      
try {         
console.log("Establishing new database connection");         
const connection = await mongoose.connect(process.env.MONGO_URL, {             
useNewUrlParser: true,             
useUnifiedTopology: true,             
serverSelectionTimeoutMS: 5000, // Timeout for initial server selection             
maxPoolSize: 10, // Limit connection pool size             
bufferCommands: false, // Disable Mongoose buffering         
});         
cachedConnection = connection;         
console.log("Database connected");         
return connection;     
} 
catch (error) {         
    console.error("Database connection error:", error);         
    throw error;     
} };  
// Initialize connection once at startup (not per request) 
let dbPromise = connectDB(); // This runs when the module loads  // Express app setup const express = require('express'); const app = express();  // Middleware to ensure DB is ready (only checks, doesn’t reconnect) 
const ensureDBConnection = async (req, res, next) => {     
try {         
await dbPromise; // Wait for the initial connection promise to resolve         
next();     
} 
catch (error) {         
    res.status(500).json({ error: "Database connection failed" });     
} };  // Apply middleware to all routes 
app.use(ensureDBConnection); 

app.listen(process.env.PORT, ()=> console.log(`http://localhost:${process.env.PORT}`))


app.get("/", (req,res)=>{
    res.send("API FOR VETERANS")
})

module.exports = app;