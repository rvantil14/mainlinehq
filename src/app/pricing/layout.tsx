import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Mainline",
  description:
    "Simple pricing. $297/mo with a 14-day free trial. No setup fee, no contracts. AI chatbot, SMS reminders, review automation for trade businesses.",
  openGraph: {
    title: "Pricing | Mainline",
    description:
      "Simple pricing. $297/mo with a 14-day free trial. No setup fee, no contracts. AI chatbot, SMS reminders, review automation for trade businesses.",
    type: "website",
    url: "https://mainlinehq.com/pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Mainline",
    description:
      "Simple pricing. $297/mo with a 14-day free trial. No setup fee, no contracts. AI chatbot, SMS reminders, review automation for trade businesses.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
