import { PropsWithChildren } from "react";
import { InfoIcon } from "lucide-react";
import Image from "next/image";
import { ComponentProps } from "react";
import Link from "next/link";
import { Tweet } from "react-tweet";

function Highlight({ children }: PropsWithChildren) {
  return (
    <span className="dark:bg-zinc-800 dark:text-zinc-200 bg-zinc-300/40 text-zinc-700 rounded-md text-[15px] px-[5px] py-1 whitespace-nowrap highlight-comp font-medium">
      {children}
    </span>
  );
}

function NoWrap({ children }: PropsWithChildren) {
  return <span className="whitespace-nowrap">{children}</span>;
}

function Note({ children }: PropsWithChildren) {
  return (
    <div className=" dark:bg-zinc-900 bg-zinc-50 rounded-md px-3 py-4 h-fit prose-p:m-0 my-6 flex flex-row items-start gap-3 font-medium">
      <InfoIcon className="min-w-[18px] min-h-[18px] max-w-[19px] max-h-[19px]" />
      <span className="text-[14px]">{children}</span>
    </div>
  );
}

function Snippet({ children }: { children: string }) {
  return (
    <Highlight>
      <code className="font-mono whitespace-nowrap font-medium before:hidden bg-transparent after:hidden">
        {children}
      </code>
    </Highlight>
  );
}

type StaticImgProps = ComponentProps<typeof Image>;

function StaticImg(props: StaticImgProps) {
  return (
    <div className="relative w-full min-h-[400px] max-h-[450px] mb-16 -mt-2">
      <Image className="rounded-xl" {...props} alt="" fill />
    </div>
  );
}

function HTMLTag({ children }: { children: string }) {
  return (
    <span className="dark:bg-zinc-800 bg-zinc-200 px-2 rounded-md text-sm py-1  mx-[2px] font-normal font-mono">
      {"<"}
      {children}
      {">"}
    </span>
  );
}

function Quote({ children }: PropsWithChildren) {
  return (
    <div className="border-l-4 border-[#404040] pl-4 font-semibold italic">
      {children}
    </div>
  );
}

export const components = {
  Highlight,
  HTMLTag,
  StaticImg,
  Snippet,
  Note,
  NoWrap,
  Link,
  Quote,
  Tweet,
};
