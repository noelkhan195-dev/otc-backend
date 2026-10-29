const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: "active", 
    message: "OTC Backend Server Active Hai!" 
  });
});

// Root Route
app.get('/', (req, res) => {
  res.send("One Time Committee (OTC) Backend Server Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 OTC Backend Server Running On Port ${PORT}`);

  // Auto Self-Ping Logic (Fly.io se live URL milne ke baad yahan update kar sakte hain)
  const LIVE_SERVER_URL = "https://otc-backend.fly.dev/api/health";
  
  setInterval(async () => {
    try {
      await axios.get(LIVE_SERVER_URL);
      console.log("⏰ Self-ping successful: Server awake hai!");
    } catch (err) {
      console.log("Ping status:", err.message);
    }
  }, 10 * 60 * 1000); // Har 10 minute baad ping
});