import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: 'swap',
});



export const metadata: Metadata = {
  title: "Skinstric",
  description: "An internship to excel me forward",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased`}
      >
        <nav className="flex items-center py-4 text-xs justify-between">
          <div className="flex gap-4 pl-8 pr-8  tracking-wide">
            <div className="font-bold">sKINsTRIC</div>
            <div className="text-gray-500">[ INTRO ]</div>
          </div>
          <button className="text-white py-2 px-4 mx-8 bg-black uppercase font-bold" >Enter Code</button>
        </nav>
        {children}
      </body>
    </html>
  );
}
