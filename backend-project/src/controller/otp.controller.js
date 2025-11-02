import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { sendEmail } from "../middlewares/checkmail.middleware.js";
import { ApiError } from "../utils/apierror.js";
import { User } from "../models/user.model.js";
import { generateAccessAndRefereshTokens } from "../middlewares/generatetokes.middleware.js";
import { TempOtp } from "../models/tempotp.model.js";

const getotp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, "Email is required");

  const OTP = Math.floor(100000 + Math.random() * 900000);

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "Email already registered");

  await TempOtp.findOneAndUpdate(
    { email },
    {
      otp: OTP,
      otpExpiresAt: new Date(Date.now() + 60 * 1000),
    },
    { upsert: true, new: true }
  );

  await sendEmail(email, "Your OTP Code", `Your OTP is: ${OTP}`);

  return res
    .status(200)
    .json(new ApiResponse(200, { email }, "OTP sent successfully"));
});


const verifyotp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) throw new ApiError(400, "Email and OTP are required");

  const record = await TempOtp.findOne({ email });
  if (!record) throw new ApiError(404, "Email not found or OTP not sent");

  if (!record.otpExpiresAt || record.otpExpiresAt < new Date()) {
    await TempOtp.findOneAndUpdate({ email }, { otp: null, otpExpiresAt: null });
    throw new ApiError(400, "OTP expired, please request a new one.");
  }

  if (record.otp.toString() !== otp.toString()) {
    throw new ApiError(400, "Invalid OTP");
  }

  // ✅ clear OTP after verification
  await TempOtp.findOneAndUpdate(
    { email },
    { otp: null, otpExpiresAt: null }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { verified: true, email }, "OTP verified successfully"));
});


export { getotp, verifyotp };