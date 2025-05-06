import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matrix Rotator",
  description: "Rotate a matrix anticlockwise",
  openGraph: {
    title: "Matrix Rotator",
    description: "Rotate a matrix anticlockwise",
    type: "website",
    siteName: "Matrix Rotator",
    url: "https://matrix-app.vercel.app",
    images: [
      {
        url: "https://matrix-app.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="canonical" href="https://matrix-app.vercel.app" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
