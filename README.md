# 📚 Learning Portal

A full-stack **Learning Portal** built using **React.js, Node.js, Express.js, SQLite, and JWT Authentication**. This application enables students to securely access learning videos, create timestamp-based bookmarks, and continue learning from where they left off.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- Secure Logout

### 🎥 Learning Portal
- Browse learning videos
- Search videos by title
- Watch course videos
- Responsive video player
- Video thumbnails and descriptions

### 🔖 Bookmark Feature
- Create multiple bookmarks for a video
- Save current video timestamp
- Optional bookmark names
- View all saved bookmarks
- Resume video from bookmarked timestamp
- Delete bookmarks

### 🛡️ Content Protection
- Watermark displaying logged-in user's email
- Blur video when browser tab becomes inactive
- Disable right-click to discourage unauthorized actions

### 📊 Dashboard
- Welcome dashboard
- Total learning videos
- Bookmark statistics
- Continue Learning section

### 📱 Responsive Design
- Desktop Friendly
- Tablet Friendly
- Mobile Responsive

---

# 🛠 Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- CSS3
- Vite

## Backend
- Node.js
- Express.js

## Database
- SQLite3

## Authentication
- JWT (JSON Web Token)
- bcrypt

---

# 📂 Project Structure

```
Learning-Portal/
│
├── learning-portal/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── Server/
│   ├── controllers/
│   ├── routes/
│   ├── uploads/
│   ├── database.js
│   ├── learning.db
│   ├── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/yourusername/learning-portal.git
```

```bash
cd learning-portal
```

---

# Backend Setup

```bash
cd Server
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000
JWT_SECRET=your_secret_key
```

Run the backend

```bash
npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal

```bash
cd learning-portal
```

Install dependencies

```bash
npm install
```

Start the frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

### Videos

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/videos` | Get All Videos |
| GET | `/api/videos/:id` | Get Video By ID |

### Bookmarks

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/bookmarks` | Create Bookmark |
| GET | `/api/bookmarks/:videoId` | Get Bookmarks |
| DELETE | `/api/bookmarks/:id` | Delete Bookmark |

---

# 🗄 Database Schema

## Users

| Field | Type |
|--------|------|
| id | INTEGER |
| name | TEXT |
| email | TEXT |
| password | TEXT |
| created_at | DATETIME |

## Videos

| Field | Type |
|--------|------|
| id | INTEGER |
| title | TEXT |
| description | TEXT |
| videoUrl | TEXT |
| thumbnail | TEXT |
| duration | TEXT |
| created_at | DATETIME |

## Bookmarks

| Field | Type |
|--------|------|
| id | INTEGER |
| userId | INTEGER |
| videoId | INTEGER |
| bookmarkName | TEXT |
| timestamp | INTEGER |
| created_at | DATETIME |

---

# 📖 Application Workflow

```
User Registration
        │
        ▼
User Login
        │
        ▼
Dashboard
        │
        ▼
Browse Videos
        │
        ▼
Watch Video
        │
        ▼
Create Bookmark
        │
        ▼
Resume Learning
```

---

# 🛡 Screenshot Protection

Since web browsers cannot completely prevent screenshots, the following security measures have been implemented:

- User email watermark displayed on the video player
- Blur effect when the browser tab loses focus
- Right-click disabled on the video page
- JWT-protected routes

---

# ⭐ Future Enhancements

- Admin Dashboard
- Course Categories
- Video Upload
- Continue Watching
- Watch History
- Progress Tracking
- Video Notes
- Dark Mode
- Playback Speed Control
- Notifications

---
