import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Missed Call Audit | Mainline",
  description:
    "Find out how many calls your trade business is missing and what it's costing you every month. Free, instant results.",
  openGraph: {
    title: "Free Missed Call Audit | Mainline",
    description:
      "Find out how many calls your trade business is missing and what it's costing you every month. Free, instant results.",
    type: "website",
    url: "https://mainlinehq.com/audit",
  },
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
