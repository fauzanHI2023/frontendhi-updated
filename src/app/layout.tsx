import Navbar from "@/sections/Navbar";
import Footer from "@/components/ui/footer/Footer";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/SessionProvider";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  subsets: ['latin'],
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
      <body className={poppins.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <AuthProvider>
            <Navbar/>
            {children}
            <Footer/>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

