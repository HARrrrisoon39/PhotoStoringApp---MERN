import express from "express";
import { signIn, signUp } from "../controller/users.js";


const router = express.Router();

router.post("/singin", signIn);
router.post("/singup", signUp);

export default router;
