import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Mainline",
  description:
    "Schedule a free 15-minute consultation. Call (805) 801-1380 or fill out the form.",
  openGraph: {
    title: "Contact | Mainline",
    description:
      "Schedule a free 15-minute consultation. Call (805) 801-1380 or fill out the form.",
    type: "website",
    url: "https://mainlinehq.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Mainline",
    description:
      "Schedule a free 15-minute consultation. Call (805) 801-1380 or fill out the form.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
