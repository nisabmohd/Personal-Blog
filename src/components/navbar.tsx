"use client";

import { Github, Twitter, Menu, Command, Linkedin } from "lucide-react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import ThemeMode from "./dark-toggle";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading)
    return (
      <div className="w-[85%] max-[1200px]:w-[85%] max-[500px]:w-[91%] m-auto flex flex-row items-center justify-between h-14 py-2 z-40"></div>
    );

  return (
    <div className="w-[65%] max-[1200px]:w-[85%] max-[500px]:w-[91%] m-auto flex flex-row items-center justify-between h-14 py-2 z-[9999] pl-[2px]">
      <Sheet open={sheetOpen} onOpenChange={(val) => setSheetOpen(val)}>
        <SheetTrigger
          onClick={() => setSheetOpen(true)}
          className="min-[500px]:hidden max-[500px]:visible"
        >
          <Menu className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent className="border-none" side={"left"}>
          <SheetHeader className="mt-5">
            <SheetTitle>
              <Link
                onClick={() => setSheetOpen(false)}
                href="/"
                className="font-semibold flex flex-row items-center gap-2 "
              >
                <Command className="w-[21px] h-[21px]" />
                <span className="text-[19px] dark:text-slate-200 text-slate-800">
                  nisab/blogs
                </span>
              </Link>
            </SheetTitle>
            <SheetDescription className="text-left flex flex-col gap-7 text-sm pt-8">
              <Link onClick={() => setSheetOpen(false)} href={"/blog"}>
                Blogs
              </Link>
              <Link
                onClick={() => setSheetOpen(false)}
                href={
                  "https://drive.google.com/file/d/1Ps1G2YhzoO26Qyl8QvkuwHBxC4Hvzo5V/view?usp=sharing"
                }
              >
                Resume
              </Link>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <div className="left flex flex-row items-center gap-7 dark:text-slate-300">
        <Link
          href="/"
          className={`font-semibold flex flex-row items-center gap-2 max-[500px]:hidden dark:text-slate-200 text-slate-800 ${
            pathname == "/"
              ? "underline dark:text-slate-50 text-slate-950 "
              : ""
          }`}
        >
          <Command className="w-[21px] h-[21px]" />
          <span className="text-[19px]">nisab/blogs</span>
        </Link>
        <div className="flex flex-row gap-4 text-sm max-[500px]:hidden">
          <Link
            className={`${
              pathname == "/blog"
                ? "dark:text-slate-50 text-slate-950 font-semibold underline"
                : ""
            }`}
            href={"/blog"}
          >
            Blogs
          </Link>
          <Link
            href={
              "https://drive.google.com/file/d/1Ps1G2YhzoO26Qyl8QvkuwHBxC4Hvzo5V/view?usp=sharing"
            }
          >
            Resume
          </Link>
        </div>
      </div>

      <div className="right flex flex-row gap-1 justify-between ml-auto">
        <Link
          href="https://github.com/nisabmohd"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Github className="w-5 h-5" />
        </Link>
        <Link
          href="https://twitter.com/MohdNisab"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Twitter className="w-5 h-5" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/mohd-nisab-725148197/"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Linkedin className="w-5 h-5" />
        </Link>
        <ThemeMode />
      </div>
    </div>
  );
}
