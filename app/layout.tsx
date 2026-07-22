import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shellmind · AI Renovation Concierge",
  description: "Upload a quote to understand pricing, risks, and bargaining room.",
  icons: {
    icon: "/assets/shellmind-dark.png",
    shortcut: "/assets/shellmind-dark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
