"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export function resetCookieConsent() {
  document.cookie = "mainline_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.dispatchEvent(new CustomEvent("resetCookieConsent"));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie("mainline_consent");
    if (consent === null) {
      setVisible(true);
    }

    const handleReset = () => setVisible(true);
    window.addEventListener("resetCookieConsent", handleReset);
    return () => window.removeEventListener("resetCookieConsent", handleReset);
  }, []);

  function handleAccept() {
    setCookie("mainline_consent", "1", 365);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookieConsentChanged"));
  }

  function handleDecline() {
    setCookie("mainline_consent", "0", 365);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#1a1a2e] border-t border-white/10 px-4 py-3 sm:px-6">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-300 text-center sm:text-left">
          We use cookies and analytics to improve your experience.{" "}
          <Link href="/privacy" className="text-accent underline underline-offset-2 hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-1.5 text-sm font-medium text-gray-300 border border-white/20 rounded-md hover:text-white hover:border-white/40 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-md transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
