import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { sendEmail } from "../middlewares/checkmail.middleware.js";
import { ApiError } from "../utils/apierror.js";
import { User } from "../models/user.model.js";
import { generateAccessAndRefereshTokens } from "../middlewares/generatetokes.middleware.js";

const getotp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) throw new ApiError(400, "Email is required");

  const OTP = Math.floor(100000 + Math.random() * 900000);

  const user = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        otp: OTP,
        otpExpiresAt: new Date(Date.now() + 1 * 60 * 1000), // 1 minute expiry
      },
    },
    { new: true }
  );

  if (!user) throw new ApiError(404, "User not found");

  await sendEmail(email, "Your OTP Code", `Your OTP is: ${OTP}`);

  return res.status(200).json(
    new ApiResponse(
      200,
      { email, expiresIn: "1 minute" },
      "OTP sent successfully"
    )
  );
});
const verifyotp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) throw new ApiError(400, "Email and OTP are required");

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(404, "User not found");

  if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
    await User.findOneAndUpdate(
      { email },
      { $set: { otp: null, otpExpiresAt: null } }
    );
    throw new ApiError(400, "OTP has expired. Please request a new one.");
  }

  if (user.otp.toString() !== otp.toString()) {
    throw new ApiError(400, "Invalid OTP");
  }

  await User.findOneAndUpdate(
    { email },
    {
      $set: {
        otp: null,
        otpExpiresAt: null,
        verified: true,
      },
    },
    { new: true }
  );

    const { accesstoken, refreshtoken } = await generateAccessAndRefereshTokens(user._id);

  const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // false for localhost
  sameSite: "lax", // helps cookies work between frontend and backend on localhost
  maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
};

    res
    .status(200)
    .cookie("accesstoken", accesstoken ,options)
    .cookie("refreshtoken", refreshtoken ,options)
    .json(new ApiResponse(200, { user : user, accesstoken,refreshtoken, verified: true }, "OTP verified successfully"));
});

export { getotp, verifyotp };