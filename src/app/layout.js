// import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Jacques_Francois } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jacques= Jacques_Francois({
  variable: "--font-jacques",
  weight: '400',
  subsets: ["latin"],
});

export const metadata = {
  title: "Luminara News",
  description: "All news on Luminara",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      suppressHydrationWarning
        className={`${inter.variable} ${jacques.variable} antialiased `}
      >
        <div className="max-w-screen-xl mx-auto px-2 md:px-23">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
