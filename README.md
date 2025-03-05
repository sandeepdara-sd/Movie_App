# 🎬 Movie Library App

## 📌 Overview
The **Movie Library App** is a full-stack web application built using the **MERN stack** (MongoDB, Express, React, Node.js). It allows users to browse, search, and manage their favorite movies, create personalized playlists, and maintain user sessions using **Redux**. The frontend is styled with **MUI (Material-UI)** for a modern and responsive design.

## 🚀 Features
- 🔐 **User Authentication** (Signup & Login)
- 🎥 **Browse and Search Movies**
- 📄 **View Movie Details**
- 📌 **Add Movies to Playlists**
- 👤 **User Profile Management**
- ⚛️ **Redux for State and Session Management**
- 🎨 **Responsive UI with Material-UI**
- 🔒 **Secure API with JWT Authentication**

---
## 🏗️ Tech Stack
### **Frontend:**
- ⚛️ React.js
- 🛠️ Redux (for state & session management)
- 🎨 Material-UI (for styling)
- 🌐 Axios (for API requests)

### **Backend:**
- 🚀 Node.js
- ⚡ Express.js
- 🛢️ MongoDB (Mongoose ODM)
- 🔑 JWT (JSON Web Tokens for authentication)
- 🔒 bcrypt.js (for password hashing)

---
## 📁 Project Structure
```
Movie-Library-App/
│── backend/
│   ├── controllers/
│   ├── model/
│   ├── routes/
│   ├── .env
│   ├── app.js
│   ├── package.json
│── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── HomePage.js
│   │   │   ├── LoginForm.js
│   │   │   ├── MovieDetails.js
│   │   │   ├── MovieLibrary.js
│   │   │   ├── Playlist.js
│   │   │   ├── SearchMovie.js
│   │   │   ├── SignupForm.js
│   │   │   ├── UserDetails.js
│   │   ├── store/
│   │   ├── App.js
│   │   ├── index.js
│── README.md
│── package.json
│── vercel.json
```

---
## 🛠️ Installation & Setup
### **1️⃣ Clone the repository**
```sh
git clone https://github.com/your-username/movie-library-app.git
cd movie-library-app
```

### **2️⃣ Backend Setup**
```sh
cd backend
npm install
```
#### 📌 Create a `.env` file in the `backend` folder and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

#### 🚀 Start the backend server
```sh
npm start
```

### **3️⃣ Frontend Setup**
```sh
cd ../frontend
npm install
```
#### 🚀 Start the frontend server
```sh
npm start
```

---
## 🔗 API Endpoints
| 📝 Method | 🌍 Endpoint | 📌 Description |
|--------|---------|-------------|
| **POST** | `/api/users/signup` | User Signup |
| **POST** | `/api/users/login` | User Login |
| **GET** | `/api/movies` | Fetch All Movies |
| **GET** | `/api/movies/:id` | Fetch Movie by ID |
| **POST** | `/api/playlists` | Create Playlist |
| **GET** | `/api/playlists/:userId` | Get User's Playlists |

---
## 📷 Screenshots
#### 🏠 **Home Page**
![Home Page](https://via.placeholder.com/800x400)

#### 🎬 **Movie Details Page**
![Movie Details](https://via.placeholder.com/800x400)

#### 🔑 **User Authentication**
![Login Page](https://via.placeholder.com/800x400)

---
## 💡 Future Enhancements
- 🤖 Implement a Recommendation System
- ⭐ Add Movie Reviews & Ratings
- 💳 Integrate a Payment Gateway for Premium Features
- 🌍 Multi-language Support

---
## 👨‍💻 Contributing
Contributions are always welcome! If you'd like to contribute:
1️⃣ Fork the repository.
2️⃣ Create a new branch (`feature/your-feature`)
3️⃣ Commit your changes and push the branch.
4️⃣ Create a Pull Request.

---
## 📜 License
This project is licensed under the **MIT License**.

---
## 📩 Contact
For queries, reach out to [Sandeep Dara](https://linkedin.com/in/sandeep-dara-1b0a23242) or email at **sandeepdara44@gmail.com**.

---

