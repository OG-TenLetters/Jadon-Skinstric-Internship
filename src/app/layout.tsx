import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
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
      <body className={`${notoSans.className} antialiased`}>
        <nav className="flex items-center h-[7vh] text-xs justify-between md:static fixed w-[100%] bg-white">
          <div className="flex gap-4 sm:px-8 pl-4 tracking-wide">
            <Link href="/" className="font-bold">sKINsTRIC</Link>
            <div className="text-gray-500">[ INTRO ]</div>
          </div>
          <button className="text-white py-2 px-4 sm:mx-8 mr-4 bg-black uppercase font-bold rounded-xs
           transition-all duration-300 hover:shadow-[0_2px_12px_4px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:active:scale-100 hover:active:shadow-none cursor-not-allowed">
            Enter Code
          </button>
        </nav>
        {children}
      </body>
    </html>
  );
}
