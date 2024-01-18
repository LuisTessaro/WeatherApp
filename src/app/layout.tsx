import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";

import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "AI Collaborator weather app coding challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
