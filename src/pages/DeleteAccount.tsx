import React from "react";
import DeleteAccountFlow from "../components/DeleteAccountFlow";

const SEND_URL = "https://api.pgowner.in/v1/owner/send-otp-delete";
const VERIFY_URL = "https://api.pgowner.in/v1/owner/verify-otp-delete";

export default function DeleteAccount() {
  return (
    <DeleteAccountFlow
      heading="Delete Account"
      description="Request account deletion by verifying your mobile number. You will receive an OTP to confirm this action."
      sendUrl={SEND_URL}
      verifyUrl={VERIFY_URL}
    />
  );
}
