const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./routes/uploadManyVeterans");
const getRoute = require("./routes/createDocument");
const getRoute2 = require("./routes/getAllData");
const getRoute3 = require("./routes/getCoords");
const getRoute4 = require("./routes/getAllSelected");
const postRoute = require("./routes/createAdmin");
const postRoute2 = require("./routes/set2FactorCode");
const postRoute3 = require("./routes/validatePortal");
const postRoute4 = require("./routes/validateEmail");
const postMaterialRoute = require("./routes/handleMaterialUpload")
const getMaterialRoutes = require("./routes/getMaterial")
const handleVisit = require("./routes/handleVisit")

const select = require("./routes/handleResearchSelection");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://vet-website-eight.vercel.app",
      "http://localhost:3000/",
      "https://vet-website-eight.vercel.app/",
      "https://ww2-canadian-mia-aircrew-database.org"
    ],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use("/", route);
app.use("/", getRoute);
app.use("/", getRoute2);
app.use("/", getRoute3);
app.use("/", getRoute4);
app.use("/", postRoute2);
app.use("/", postRoute3);
app.use("/", postRoute4);
app.use("/", postMaterialRoute);
app.use('/', getMaterialRoutes)
app.use('/', handleVisit)


app.use("/", postRoute);

app.use("/", select);

// Global variable to cache the connection promise
let cachedConnectionPromise = null;

const connectDB = async () => {
  // If we have a cached promise and the connection is still alive, reuse it
  if (cachedConnectionPromise) {
    const connection = mongoose.connection;
    if (connection.readyState === 1) {
      // 1 = connected
      console.log("Using cached database connection");
      return cachedConnectionPromise;
    }
    console.log("Cached connection is stale, reconnecting...");
  }

  try {
    console.log("Establishing new database connection");
    const connectionPromise = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Timeout for initial server selection
      maxPoolSize: 10, // Limit connection pool size
    });
    cachedConnectionPromise = connectionPromise;
    await connectionPromise; // Ensure connection completes before returning
    console.log("Database connected");
    return connectionPromise;
  } catch (error) {
    console.error("Database connection error:", error);
    cachedConnectionPromise = null; // Reset on failure
    throw error;
  }
};

// Initialize connection at startup
connectDB().catch((err) => console.error("Initial connection failed:", err));

// Initialize connection at startup
connectDB().catch((err) => console.error("Initial connection failed:", err));

// Middleware to ensure DB is ready and valid
const ensureDBConnection = async (req, res, next) => {
  try {
    await connectDB(); // This will reuse or reconnect as needed
    next();
  } catch (error) {
    console.error("Middleware connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
};

// Apply middleware to all routes
app.use(ensureDBConnection);


app.get("/pingDB", async (req, res) => {
    try {
        await connectDB();
        res.status(200).json({ message: "MongoDB is awake!" });
    } catch (error) {
        console.error("MongoDB Ping Error:", error);
        res.status(500).json({ error: "Database ping failed" });
    }
})


app.listen(process.env.PORT, ()=> console.log(`http://localhost:${process.env.PORT}`))


app.get("/", (req, res) => {
  res.send("API FOR VETERANS");
});

module.exports = app;
