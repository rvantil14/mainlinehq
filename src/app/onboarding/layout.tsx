import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started | Mainline",
  description:
    "Set up your AI front office in under a week. Tell us about your trade business and pick your plan.",
  openGraph: {
    title: "Get Started | Mainline",
    description:
      "Set up your AI front office in under a week. Tell us about your trade business and pick your plan.",
    type: "website",
    url: "https://mainlinehq.com/onboarding",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Started | Mainline",
    description:
      "Set up your AI front office in under a week. Tell us about your trade business and pick your plan.",
  },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
