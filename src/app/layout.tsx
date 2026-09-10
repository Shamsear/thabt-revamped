import type { Metadata } from "next";
import "./globals.css";
import { ClientScripts } from "@/components/ClientScripts";
import { AppProvider } from "@/context/AppContext";
import { GlobalModals } from "@/components/GlobalModals";

export const metadata: Metadata = {
  title: "Thabt – Premium ProClips Device Holders & Mounts | GCC & Middle East Delivery",
  description:
    "Buy premium ProClips device holders, leather mounts, and mobile accessories at Thabt.qa. Fast delivery to GCC countries: UAE, Saudi Arabia, Kuwait, Bahrain, Oman, Qatar.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" />
      </head>
      <body className="antialiased">
        <AppProvider>
          {children}
          <GlobalModals />
        </AppProvider>
        <ClientScripts />
      </body>
    </html>
  );
}
