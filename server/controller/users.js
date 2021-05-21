import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../model/userMesage.js";

export const signIn = async (req, res) => {
  const {email,password } = req.body;

  try {
    const existUser = await Users.findOne({ email });
    if (!existUser) return res.status(400).json({ message: "No User" });
    const passwordMatch = await bcrypt.compare(password, existUser.password);
    if (!passwordMatch)
      return res.status(400).json({ message: "No Password Match" });
    const token = jwt.sign(
      { email: existUser.email, id: existUser._id },
      "testing",
      { expiresIn: "3h" }
    );
    res.json({ result: existUser, token });
  } catch (error) {
    res.json("error");
  }
};

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existUser = await Users.findOne({ email });
    if (existUser)
      return res.status(400).json({ message: "already have user" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "no same password" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await Users.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "testing", {
      expiresIn: "3h",
    });
    res.json({ result, token });
  } catch (error) {
    res.json(error);
  }
};
