import React from "react";
import DeleteAccountFlow from "../components/DeleteAccountFlow";

const SEND_URL = "https://api.pgguest.in/v1/profile/send-otp-delete";
const VERIFY_URL = "https://api.pgguest.in/v1/profile/verify-otp-delete";

export default function GuestDeleteAccount() {
  return (
    <DeleteAccountFlow
      heading="Delete Guest Account"
      description="Request guest account deletion by verifying your mobile number. An OTP will be sent to confirm this action."
      sendUrl={SEND_URL}
      verifyUrl={VERIFY_URL}
    />
  );
}
