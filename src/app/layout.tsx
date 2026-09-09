import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thabt Mounts – Premium ProClips Device Holders & Mounts | GCC Delivery",
  description:
    "Buy premium ProClips device holders, custom car mounts, leather mounts, and mobile accessories at Thabt.qa. Fast delivery to GCC countries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
