import express, { Router } from "express";
import { getotp, verifyotp } from "../controller/otp.controller.js";

const router = Router();

router.route("/send-otp").post(getotp);
router.route("/verify-otp").post(verifyotp);

export default router;
