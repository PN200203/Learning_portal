# 📚 Learning Portal

A full-stack Learning Portal built using **React.js, Node.js, Express.js, SQLite, and JWT Authentication**. This application allows users to register, log in securely, browse educational videos, watch them, and create bookmarks at specific timestamps for easy revision.

---

## 🚀 Live Demo

### 🌐 Frontend
**https://learning-portal-opal.vercel.app**

### ⚙️ Backend API
**https://learning-portal-api-4d8s.onrender.com**

---

## 📌 Features

- 🔐 User Registration & Login
- 🔑 JWT Authentication
- 🎥 Browse Educational Videos
- ▶️ Watch Videos
- 🔖 Create Timestamp Bookmarks
- 🗑️ Delete Bookmarks
- 📱 Responsive User Interface
- 💾 SQLite Database
- 🌐 RESTful API Architecture

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- SQLite3
- JWT Authentication
- bcrypt
- CORS
- dotenv

---

## 📂 Project Structure

```text
Learning_portal
│
├── Server
│   ├── middleware
│   ├── routes
│   ├── database
│   ├── node_modules
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── learning-portal
│   ├── public
│   ├── src
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/PN200203/Learning_portal.git
```

---

### Backend Setup

```bash
cd Server
npm install
npm start
```

Backend runs on:

```text
http://localhost:5000
```

---

### Frontend Setup

```bash
cd learning-portal
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔐 Authentication

- JWT Token Authentication
- Password Encryption using bcrypt
- Protected Routes
- Authorization Middleware

---

## 📡 REST API Endpoints

### Authentication

| Method | Endpoint |
|--------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Videos

| Method | Endpoint |
|--------|----------|
| GET | /api/videos |
| GET | /api/videos/:id |

### Bookmarks

| Method | Endpoint |
|--------|----------|
| GET | /api/bookmarks |
| POST | /api/bookmarks |
| DELETE | /api/bookmarks/:id |

---

## 🌍 Deployment

### Frontend (Vercel)

https://learning-portal-opal.vercel.app

### Backend (Render)

https://learning-portal-api-4d8s.onrender.com

---

## 📸 Project Screens

- Login Page
- Register Page
- Home Dashboard
- Video Player
- Bookmarks Page

---

## 🎯 Future Enhancements

- Admin Dashboard
- Video Upload
- Course Categories
- Continue Watching
- Watch History
- User Profile
- Dark Mode
- Progress Tracking
- Search & Filter Videos
- Toast Notifications

