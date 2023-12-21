const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Create connection to MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Edakalathur@173",
  database: "login_system",
});

connection.connect();

// Middleware for parsing JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve login HTML page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

// Serve signup HTML page
app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

// Handle login POST request
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  connection.query(
    query,
    [username, password],
    (error, results, fields) => {
      if (error) throw error;
      if (results.length > 0) {
        res.send("Login successful!");
      } else {
        res.send("Invalid username or password");
      }
    }
  );
});

// Handle signup POST request
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  connection.query(
    query,
    [username, email, password],
    (error, results, fields) => {
      if (error) throw error;
      res.send("Signup successful!");
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
