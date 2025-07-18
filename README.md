# 🎉 EventoSphere – Corporate Event Management System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Tech Stack](https://img.shields.io/badge/stack-MERN-orange)

**EventoSphere** is a dynamic and secure MERN Stack-based application designed for managing corporate and industry-specific events. It enables seamless event creation, booking, and attendance tracking with QR codes. The system is equipped with role-based access for users, organizers, and admins to streamline event workflows with real-time feedback and approvals.

---

## 🚀 Features

- 🏠 **Landing Page**: Highlights platform benefits and navigation for users, organizers, and admins.
- 🔐 **Role-Based Authentication**:
  - **User**: Can register, log in, book events, and submit feedback.
  - **Organizer**: Apply for approval → post events → track attendees.
  - **Admin**: Approves organizers/events, manages users, views feedback.
- 🗓️ **Event Booking System**: Users can view event details and book tickets.
- 🔍 **QR Code Attendance**: Auto-generated QR code for each booking, scanned at the event for secure check-ins.
- ✅ **Admin Approval System**: All organizers and events go through admin approval to ensure quality control.
- 📝 **Feedback Module**: Role-based feedback visibility for users, organizers, and admins.
- 🛡️ **Secure**: Form validations, role restrictions, and event constraints (no past-date events).

---

## 🧰 Tech Stack

| Frontend       | Backend          | Database  | Others            |
|----------------|------------------|-----------|-------------------|
| React.js       | Node.js          | MongoDB   | QR Code Generator |
| Tailwind CSS   | Express.js       | Mongoose  | JWT Authentication|
| Axios, React Router | Bcrypt, Multer | MongoDB Atlas | dotenv, CORS     |

---

## ⚙️ Installation and Setup

### 🔽 Clone the Repository

```bash
git clone https://github.com/Sunil-0507/EventoSphere.git
cd EventoSphere
```

### 📦 Backend Setup (Server)

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Then start the backend server:

```bash
npm start
```

---

### 🖥️ Frontend Setup (Client)

```bash
cd client
npm install
npm start
```

Visit `http://localhost:3000` in your browser to view the app.

---

## 🧪 Sample Credentials (For Testing)

> Replace or seed with dummy data as required.

- **Admin**
  - Email: `admin@eventosphere.com`
  - Password: `admin123`
- **Organizer**
  - Email: `organizer@example.com`
  - Password: `organize123`
- **User**
  - Email: `user@example.com`
  - Password: `user123`

---

## 📷 Screenshots



<img width="1920" height="1020" alt="Screenshot 2025-04-25 024926" src="https://github.com/user-attachments/assets/7ecee933-c29a-4422-a203-aad1390215b6" />

<img width="1918" height="920" alt="Screenshot 2025-04-25 112105" src="https://github.com/user-attachments/assets/2e531146-dbbe-4fdc-bb9e-33e7a7816718" />

---

## 🛠️ Folder Structure

```bash
EventoSphere/
│
├── client/              # Frontend (React)
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
│
├── server/              # Backend (Express, MongoDB)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
│
└── README.md
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add: Your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request

Please ensure your code follows the project's coding standards.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## 🙋‍♂️ Author

**Sunil Pattupogula**  
[GitHub](https://github.com/Sunil-0507)  


---

## 🌐 Connect with Us

For collaborations, suggestions, or bug reports:
[GitHub](https://github.com/Sunil-0507)  

---

**✨ Let’s revolutionize corporate event management, one click at a time!**
