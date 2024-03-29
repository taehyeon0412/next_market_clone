import Link from "next/link";

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
  return (
    <Link href={href}>
      <div
        className="fixed hover:bg-orange-500 
      border-0 aspect-square border-transparent transition-colors 
      cursor-pointer bottom-24 ml-[430px] shadow-xl 
      bg-orange-400 rounded-full w-14 flex items-center 
      justify-center text-white"
      >
        {children}
      </div>
    </Link>
  );
}
