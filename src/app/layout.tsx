import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";

const font = Inter({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nisab/blogs",
  description:
    "Welcome to Nisab Mohd's blog. Explore a collection of personal blogs chronicling my coding journey and experiences, filled with insights, challenges, and solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" id="body-theme">
      <body
        className={`${font.className} dark:bg-neutral-900 dark:text-neutral-50 text-zinc-800  h-screen`}
      >
        <nav className="sticky top-0 border-b-[1px] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 bg-white ">
          <Navbar />
        </nav>

        <main className="py-5 w-[35%] max-[1200px]:w-[85%] max-[500px]:w-[91%] m-auto min-h-[82vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
