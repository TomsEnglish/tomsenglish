import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import LocalizedNav from "@/components/nav/localized";
import Footer from "@/components/footer";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "400", "700"],
});

export const metadata: Metadata = {
  title: "Tom's English",
  description: "English classes and resources",
};

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`font-sans ${roboto.className}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex flex-col items-center h-screen">
        <LocalizedNav />
        <article className="prose md:prose-md lg:prose-lg flex flex-col justify-start container-screen grow">
          {children}
        </article>
        <Footer />
      </body>
    </html>
  );
}
