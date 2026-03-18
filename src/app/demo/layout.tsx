import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Demo | Mainline",
  description:
    "See our AI chatbot in action. Pick a trade business and watch it capture leads, answer questions, and book appointments.",
  openGraph: {
    title: "Live Demo | Mainline",
    description:
      "See our AI chatbot in action. Pick a trade business and watch it capture leads, answer questions, and book appointments.",
    type: "website",
    url: "https://mainlinehq.com/demo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Demo | Mainline",
    description:
      "See our AI chatbot in action. Pick a trade business and watch it capture leads, answer questions, and book appointments.",
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
