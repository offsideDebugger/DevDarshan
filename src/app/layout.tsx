import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  Providers  from "../../SessionProvider";
import { BookmarkProvider } from "../contexts/BookmarkContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevDarshan",
  description: "Your ultimate companion for navigating Google Summer of Code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>DevDarshan</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <Providers>
        <BookmarkProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>
        </BookmarkProvider>
      </Providers>
    </html>
  );
}
