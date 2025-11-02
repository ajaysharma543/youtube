import axiosclient from "./api";

const OtpApi = {
  sendOtp: (email) => axiosclient.post("/otp/send-otp", { email }),
  verifyOtp: ({ email, otp }) => axiosclient.post("/otp/verify-otp", { email, otp }),
};

export default OtpApi;
