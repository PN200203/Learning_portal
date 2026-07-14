require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");

const db = require("./database");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

// Static Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Learning Portal Backend Running 🚀"
  });
});

// ----------------------
// Temporary Video API
// ----------------------

app.get("/videos", (req, res) => {
  const query = `SELECT * FROM videos`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.json({
      success: true,
      videos: rows
    });
  });
});

// ----------------------
// Insert Sample Videos
// ----------------------

app.get("/seed", (req, res) => {

  const videos = [
    {
      title: "React Introduction",
      description: "Learn React Basics",
      videoUrl:
        "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
      thumbnail:
        "https://picsum.photos/300/200?1",
      duration: "5 min"
    },
    {
      title: "JavaScript Tutorial",
      description: "Complete JS Guide",
      videoUrl:
        "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
      thumbnail:
        "https://picsum.photos/300/200?2",
      duration: "10 min"
    },
    {
      title: "NodeJS Course",
      description: "Backend Development",
      videoUrl:
        "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
      thumbnail:
        "https://picsum.photos/300/200?3",
      duration: "15 min"
    }
  ];

  const sql = `
  INSERT INTO videos
  (title,description,videoUrl,thumbnail,duration)
  VALUES(?,?,?,?,?)
  `;

  videos.forEach((video) => {
    db.run(sql, [
      video.title,
      video.description,
      video.videoUrl,
      video.thumbnail,
      video.duration
    ]);
  });

  res.json({
    success: true,
    message: "Sample Videos Added Successfully"
  });

});

// ----------------------
// 404
// ----------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

// ----------------------
// Server
// ----------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});