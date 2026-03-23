import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Mainline",
  description:
    "Transparent pricing for AI automation. Starter $297/mo, Growth $797/mo, Pro $1,497/mo. No contracts, cancel anytime.",
  openGraph: {
    title: "Pricing | Mainline",
    description:
      "Transparent pricing for AI automation. Starter $297/mo, Growth $797/mo, Pro $1,497/mo. No contracts, cancel anytime.",
    type: "website",
    url: "https://mainlinehq.com/pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Mainline",
    description:
      "Transparent pricing for AI automation. Starter $297/mo, Growth $797/mo, Pro $1,497/mo. No contracts, cancel anytime.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
