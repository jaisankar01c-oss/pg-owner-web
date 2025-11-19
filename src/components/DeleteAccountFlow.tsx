import React, { useEffect, useMemo, useState } from "react";
import "../styles/theme.css";
import { sectionPadding, cn } from "../common/utils/responsive";
import axios from "axios";

type ApiResponse<T = any> = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: T;
};

export type DeleteAccountFlowProps = {
  heading?: string;
  description?: string;
  sendUrl: string;
  verifyUrl: string;
};

export default function DeleteAccountFlow({
  heading = "Delete Account",
  description = "Request account deletion by verifying your mobile number. You will receive an OTP to confirm this action.",
  sendUrl,
  verifyUrl,
}: DeleteAccountFlowProps) {
  const [step, setStep] = useState<"mobile" | "otp" | "done">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string>("");
  const [msgType, setMsgType] = useState<"success" | "error" | "info">("info");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const canResend = useMemo(() => cooldown === 0 && step === "otp", [cooldown, step]);

  function onMobileChange(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 10);
    setMobile(digits);
  }

  function onOtpChange(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 6);
    setOtp(digits);
  }

  async function handleSendOtp(e?: React.FormEvent) {
    e?.preventDefault();
    setMsg("");
    if (mobile.length !== 10) {
      setMsgType("error");
      setMsg("Enter a valid 10‑digit mobile number.");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post<ApiResponse>(sendUrl, { mobile });
      if (data?.success) {
        setMsgType("success");
        setMsg(data.message || "OTP has been sent to your mobile number.");
        setStep("otp");
        setCooldown(30);
      } else {
        const m = data?.errors?.mobile || data?.message || "Failed to send OTP.";
        setMsgType("error");
        setMsg(m);
      }
    } catch (err: any) {
      const m = err?.response?.data?.message || err?.message || "Network error. Please try again.";
      setMsgType("error");
      setMsg(m);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e?: React.FormEvent) {
    e?.preventDefault();
    setMsg("");
    if (otp.length < 4) {
      setMsgType("error");
      setMsg("Enter the OTP received on your mobile.");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post<ApiResponse>(
        verifyUrl,
        { mobile, otp }
      );
      if (data?.success) {
        setMsgType("success");
        setMsg(data.message || "Deletion request submitted. Admin will verify within 90 days.");
        setStep("done");
      } else {
        const m = data?.message || "The OTP you entered is incorrect. Please try again.";
        setMsgType("error");
        setMsg(m);
      }
    } catch (err: any) {
      const m = err?.response?.data?.message || err?.message || "Network error. Please try again.";
      setMsgType("error");
      setMsg(m);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!canResend) return;
    await handleSendOtp();
  }

  function resetToMobile() {
    setStep("mobile");
    setOtp("");
    setMsg("");
    setCooldown(0);
  }

  const banner = msg ? (
    <div
      className={cn(
        "mt-4 rounded-lg p-3 text-sm",
        msgType === "success" && "bg-[var(--bgSuccess)] text-[var(--successDark)]",
        msgType === "error" && "bg-[var(--bgDanger)] text-[var(--dangerDark)]",
        msgType === "info" && "bg-[var(--bgWarning)] text-[var(--warningDark)]"
      )}
      role="status"
      aria-live="polite"
    >
      {msg}
    </div>
  ) : null;

  return (
    <section className={cn(sectionPadding, "min-h-[70vh] flex items-start sm:items-center") }>
      <div className="container-max w-full">
        <div className="mx-auto w-full max-w-md sm:max-w-lg">
          <h1 className="section-title text-3xl text-center">{heading}</h1>
          <p className="mt-3 text-dark/80 text-center">{description}</p>

          <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-input">
            <div className="h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--warning)] to-[var(--success)]" />
            <div className="p-6 sm:p-7">
              {step === "mobile" && (
                <form onSubmit={handleSendOtp} className="grid gap-4">
                  <label className="text-sm font-medium text-tertiary" htmlFor="mobile">Mobile number</label>
                  <input
                    id="mobile"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="border border-input rounded-lg px-4 py-3 w-full"
                    placeholder="Enter 10‑digit mobile"
                    value={mobile}
                    onChange={(e) => onMobileChange(e.target.value)}
                    disabled={loading}
                    aria-invalid={mobile.length > 0 && mobile.length !== 10}
                    aria-describedby="mobile-help"
                  />
                  <div id="mobile-help" className="text-xs text-dark/60">We will send an OTP to this number.</div>
                  <button
                    type="submit"
                    className={cn("btn-primary rounded-lg px-6 py-3 w-full", loading && "opacity-80 cursor-not-allowed")}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </form>
              )}

              {step !== "mobile" && (
                <div className="mb-4 text-sm">
                  <span className="text-dark/70">Mobile:</span>{" "}
                  <span className="font-semibold text-tertiary">+91 {mobile}</span>
                  {step !== "done" && (
                    <button onClick={resetToMobile} className="ml-2 text-primary underline underline-offset-2">Change</button>
                  )}
                </div>
              )}

              {step === "otp" && (
                <form onSubmit={handleVerifyOtp} className="grid gap-4">
                  <label className="text-sm font-medium text-tertiary" htmlFor="otp">Enter OTP</label>
                  <input
                    id="otp"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="border border-input rounded-lg px-4 py-3 tracking-widest text-center w-full"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => onOtpChange(e.target.value)}
                    disabled={loading}
                    aria-describedby="otp-help"
                  />
                  <div id="otp-help" className="text-xs text-dark/60 flex items-center gap-3">
                    <span>Didn’t get it?</span>
                    <button
                      type="button"
                      onClick={handleResend}
                      className={cn("text-primary underline underline-offset-2", !canResend && "pointer-events-none opacity-60")}
                      disabled={!canResend}
                    >
                      {canResend ? "Resend OTP" : `Resend in ${cooldown}s`}
                    </button>
                  </div>
                  <button
                    type="submit"
                    className={cn("btn-primary rounded-lg px-6 py-3 w-full", loading && "opacity-80 cursor-not-allowed")}
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify & Request Deletion"}
                  </button>
                </form>
              )}

              {step === "done" && (
                <div className="grid gap-4">
                  <div className="rounded-lg bg-[var(--bgSuccess)] text-[var(--successDark)] p-3 text-sm">
                    {msg || "Deletion request submitted. Admin will verify within 90 days."}
                  </div>
                  <a href="/" className="btn-primary rounded-lg px-6 py-3 w-full text-center">Back to Home</a>
                </div>
              )}

              {step !== "done" && banner}
            </div>
          </div>

          <p className="mt-6 text-xs text-dark/60 text-center">
            Note: Deletion requests are reviewed by admin. You will be notified once processed.
          </p>
        </div>
      </div>
    </section>
  );
}
