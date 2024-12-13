import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import I18nWrapper from "./I18nWrapper";
import { ToastContainer } from "react-toastify";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Realtime chat",
  description: "Realtime chat with Next and Laravel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <I18nWrapper>
          <ToastContainer/>
          {children}
        </I18nWrapper>
      </body>
    </html>
  );
}
