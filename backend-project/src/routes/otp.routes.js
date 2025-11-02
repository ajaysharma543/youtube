import express, { Router } from "express";
import { getotp, verifyotp } from "../controller/otp.contorller.js";

const router = Router();

router.post("/send-otp", getotp);
router.post("/verify-otp", verifyotp);

export default router;
