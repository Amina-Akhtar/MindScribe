const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

exports.signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign(
  { id: user._id, username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: "24h" }
);
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
      })
      .header("Authorization", `Bearer ${token}`)
      .status(201)
      .send({
        success: true, message: "Signin Successfull!"
      });
  }
  catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "User already exists" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
      })
      .header("Authorization", `Bearer ${token}`)
      .status(201)
      .send({
        success: true, message: "Signup Successfull!"
      });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.signout = async (req, res) => {
  res.clearCookie("token", {
  });
  res.status(200).send({ success: true, message: "Signout successfull" });
};
