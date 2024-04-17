import Link from "next/link";
import React from "react";

interface FloatingButtons {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButtons) {
  return (
    <Link href={href}>
      <div
        className="fixed hover:bg-orange-500 
      border-0 aspect-square border-transparent transition-colors 
      cursor-pointer bottom-24 shadow-xl 
      bg-orange-400 rounded-full w-14 flex items-center 
      justify-center text-white custom500:ml-[430px] custom400:ml-[330px] ml-[280px]"
      >
        {children}
      </div>
    </Link>
  );
}

// ml-[430px]
