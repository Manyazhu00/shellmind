import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shellmind · AI Renovation Concierge",
  description: "Know what’s fair before you sign. Shellmind checks renovation quotes for overpricing, hidden risks, and room to negotiate.",
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
