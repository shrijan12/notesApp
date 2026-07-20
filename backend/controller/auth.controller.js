import User from "../model/User.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in the required fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be more than 6 characters",
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //once the user is created we will generate the token
    const token = generateToken(user._id);

    //once the user is created, we will send out that created token
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = (req, res) => {
  res.send("hey from register");
};
