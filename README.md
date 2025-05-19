# school-auth-backend
A Node.js and MongoDB backend for a school management system where admins register students, and students can log in securely using JWT authentication.

## 🚀 Features

- 🔐 JWT Authentication
- 🧑‍🏫 Admin registers students
- 👨‍🎓 Students can log in
- 🔒 Passwords hashed using bcrypt
- 🔐 Protected routes for different user roles (admin/student)
- 🍪 Auth token stored in cookies
- ✅ Async error handling with `express-async-handler`

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cookie-parser

  ### Setup
1. Clone the repo
2. Run `npm install`
3. Add `.env` with
