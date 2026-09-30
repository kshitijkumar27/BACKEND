// server.js

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

// Read JSON data
app.use(express.json());

// Read data coming from HTML forms
app.use(express.urlencoded({ extended: true }));


// ==========================================
// CONNECT TO LOCAL MONGODB
// ==========================================

const DB_URL = "mongodb://127.0.0.1:27017/lab2";

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });


// ==========================================
// USER SCHEMA
// ==========================================

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});


// ==========================================
// USER MODEL
// ==========================================

const User = mongoose.model("User", userSchema);


// ==========================================
// HOME PAGE
// ==========================================

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>

    <html>

    <head>
      <title>MongoDB User Management</title>

      <style>

        body {
          font-family: Arial;
          max-width: 700px;
          margin: 40px auto;
          padding: 20px;
        }

        .container {
          background: #f2f2f2;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 10px;
        }

        input {
          width: 100%;
          padding: 10px;
          margin: 6px 0;
          box-sizing: border-box;
        }

        button {
          padding: 10px 20px;
          margin-top: 10px;
          cursor: pointer;
        }

      </style>

    </head>

    <body>

      <h1>User Management System</h1>

      <!-- SIGNUP -->

      <div class="container">

        <h2>Register User</h2>

        <form action="/signup" method="POST">

          <input
            type="text"
            name="username"
            placeholder="Username"
            required
          >

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
          >

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          >

          <button type="submit">
            Sign Up
          </button>

        </form>

      </div>


      <!-- LOGIN -->

      <div class="container">

        <h2>Login</h2>

        <form action="/login" method="POST">

          <input
            type="text"
            name="username"
            placeholder="Username"
            required
          >

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          >

          <button type="submit">
            Login
          </button>

        </form>

      </div>


      <!-- VIEW USERS -->

      <div class="container">

        <h2>Registered Users</h2>

        <a href="/users">
          <button>Show All Users</button>
        </a>

      </div>

    </body>

    </html>
  `);
});


// ==========================================
// SIGNUP
// ==========================================

app.post("/signup", async (req, res) => {

  try {

    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();

    res.send(`
      <h1>User Registered Successfully!</h1>

      <p>Username: ${username}</p>

      <p>Email: ${email}</p>

      <br>

      <a href="/">Go Back</a>
    `);

  } catch (error) {

    if (error.code === 11000) {

      res.send(`
        <h1>User already exists!</h1>
        <a href="/">Go Back</a>
      `);

    } else {

      res.send(`
        <h1>Error</h1>
        <p>${error.message}</p>
        <a href="/">Go Back</a>
      `);

    }

  }

});


// ==========================================
// LOGIN
// ==========================================

app.post("/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {

      return res.send(`
        <h1>User Not Found</h1>
        <a href="/">Go Back</a>
      `);

    }

    if (user.password !== password) {

      return res.send(`
        <h1>Incorrect Password</h1>
        <a href="/">Go Back</a>
      `);

    }

    res.send(`
      <h1>Login Successful!</h1>

      <p>Welcome ${user.username}</p>

      <p>Email: ${user.email}</p>

      <br>

      <a href="/">Go Back</a>
    `);

  } catch (error) {

    res.send(`
      <h1>Error</h1>
      <p>${error.message}</p>
      <a href="/">Go Back</a>
    `);

  }

});


// ==========================================
// SHOW ALL USERS
// ==========================================

app.get("/users", async (req, res) => {

  try {

    const users = await User.find();

    let output = `
      <h1>Registered Users</h1>
      <ul>
    `;

    users.forEach((user) => {

      output += `
        <li>
          <b>Username:</b> ${user.username}
          |
          <b>Email:</b> ${user.email}
        </li>
      `;

    });

    output += `
      </ul>

      <br>

      <a href="/">Go Back</a>
    `;

    res.send(output);

  } catch (error) {

    res.send(`
      <h1>Error</h1>
      <p>${error.message}</p>
      <a href="/">Go Back</a>
    `);

  }

});


// ==========================================
// START SERVER
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);

});

// node server.js