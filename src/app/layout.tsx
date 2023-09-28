import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";

import { Providers } from "./providers";
import NextAuthProvider from "./context/next-auth";
import { ShopifyContextProvider } from "./context/store";

import MainNav from "@/components/nav/MainNav";
import TheAnnouncement from "@/components/announcement/TheAnnouncement";
import TheFooter from "@/components/footer/TheFooter";

import "./globals.css";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"], variable: "--font-roboto-mono" });

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

type Children = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Akkadian",
  description: "Ecommerce store for hair and beard products",
};

export default async function RootLayout({ children }: Children) {
  const session = await getServerSession();

  const isAdmin = (
    <div className="flex flex-row">
      <div className="w-1/4 bg-gray-400">Hello</div>
      <div>
        <TheAnnouncement />
        <MainNav />
        {children}
      </div>
      <div className="w-1/4 bg-gray-400">Hello</div>
    </div>
  );

  const isNotAdmin = (
    <>
      <TheAnnouncement />
      <MainNav />
      {children}
    </>
  );

  return (
    <html lang="en">
      <body className={`${inter.variable} ${noto_sans.variable}`}>
        <NextAuthProvider>
          <Providers>
            <ShopifyContextProvider>
              {session ? isAdmin : isNotAdmin}
              <div className="pt-14">
                <TheFooter />
              </div>
            </ShopifyContextProvider>
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
