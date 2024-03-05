import Navbar from "@/sections/Navbar";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";
import "./globals.css";
import AuthProvider from "@/context/SessionProvider";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Human Initiative",
  description: "Human Initiative Fundraising",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <ThemeProvider>
        <AuthProvider>
          <Navbar/>
        {children}
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
