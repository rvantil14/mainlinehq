"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export default function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(getCookie("mainline_consent") === "1");

    const handleChange = () => {
      setConsented(getCookie("mainline_consent") === "1");
    };

    window.addEventListener("cookieConsentChanged", handleChange);
    return () => window.removeEventListener("cookieConsentChanged", handleChange);
  }, []);

  if (!GA_ID || !consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
