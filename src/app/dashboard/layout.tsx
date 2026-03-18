import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Dashboard | Mainline",
  description:
    "See what your Mainline dashboard looks like. Real-time leads, appointments, invoices, and performance tracking.",
  openGraph: {
    title: "Client Dashboard | Mainline",
    description:
      "See what your Mainline dashboard looks like. Real-time leads, appointments, invoices, and performance tracking.",
    type: "website",
    url: "https://mainlinehq.com/dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Dashboard | Mainline",
    description:
      "See what your Mainline dashboard looks like. Real-time leads, appointments, invoices, and performance tracking.",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
