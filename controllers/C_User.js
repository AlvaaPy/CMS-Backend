import User from "../models/M_User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Get All
export const getUser = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

//  Register
export const Register = async (req, res) => {
  const { name, username, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok!" });
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    await User.create({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.json({ msg: "Register berhasil !" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

// Login
export const Login = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        username: req.body.username,
      },
    });

    if (users.length === 0) {
      return res.status(404).json({ msg: "Username tidak ada!" });
    }

    const match = await bcrypt.compare(req.body.password, users[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    const userId = users[0].id;
    const name = users[0].name;
    const username = users[0].username;
    const email = users[0].email;
    const accessToken = jwt.sign(
      { userId, name, username, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1200s" }
    );
    const refreshToken = jwt.sign(
      { userId, name, username, email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.json({ accessToken, refreshToken, name });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
