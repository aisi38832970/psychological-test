import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import bgImg from '@/../public/bgImg.png';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "創造你的暈船音樂",
  description: "一不小心，暈成船長",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <div className="w-full h-full bg-cover bg-no-repeat overflow-y-auto flex flex-col sm:flex-row gap-5 p-8 bg-[#cca1e0]"></div> */}


          <div className="h-dvh w-96 mx-auto">
            {children}
          </div>
      </body>
    </html>
  );
}