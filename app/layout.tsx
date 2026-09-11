import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Little Learners | Learn through play",
  description: "A safe, joyful, voice-first learning playground for children ages 0–5.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
