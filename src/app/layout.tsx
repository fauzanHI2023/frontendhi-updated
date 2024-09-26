import Navbar from "@/sections/Navbar";
import Footer from "@/components/ui/footer/Footer";
import type { Metadata } from "next";
import { Poppins, Raleway, Nunito } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/SessionProvider";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000']
})

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

