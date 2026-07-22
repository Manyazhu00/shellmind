import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "问龟 Shellmind · AI 装修管家",
  description: "上传报价单，读懂价格、风险与砍价空间。",
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
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
