import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

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
        <nav className="flex items-center h-[7vh] text-xs justify-between">
          <div className="flex gap-4 pl-8 pr-8  tracking-wide">
            <div className="font-bold">sKINsTRIC</div>
            <div className="text-gray-500">[ INTRO ]</div>
          </div>
          <button className="text-white py-2 px-4 mx-8 bg-black uppercase font-bold rounded-xs
           transition-all duration-300 hover:shadow-[0_2px_12px_4px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:active:scale-100 hover:active:shadow-none cursor-not-allowed">
            Enter Code
          </button>
        </nav>
        {children}
      </body>
    </html>
  );
}
