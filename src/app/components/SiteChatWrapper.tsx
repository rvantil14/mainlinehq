"use client";

import dynamic from "next/dynamic";

const SiteChat = dynamic(() => import("./SiteChat"), { ssr: false });

export default function SiteChatWrapper() {
  return <SiteChat />;
}
