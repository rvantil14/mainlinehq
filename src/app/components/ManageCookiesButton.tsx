"use client";

import { resetCookieConsent } from "./CookieConsent";

export default function ManageCookiesButton() {
  return (
    <button
      onClick={() => resetCookieConsent()}
      className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
    >
      Manage Cookies
    </button>
  );
}
