const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database");

// Register User
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    db.get(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, user) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }

        if (user) {
          return res.status(400).json({
            success: false,
            message: "Email already exists"
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
          "INSERT INTO users(name,email,password) VALUES(?,?,?)",
          [name, email, hashedPassword],
          function (err) {
            if (err) {
              return res.status(500).json({
                success: false,
                message: err.message
              });
            }

            res.status(201).json({
              success: true,
              message: "User Registered Successfully"
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Login User
const login = (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, user) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid Email"
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid Password"
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d"
        }
      );

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    }
  );
};

module.exports = {
  register,
  login
};