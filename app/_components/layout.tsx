import { cls } from "../_libs/utils";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
}

export default function Layout({
  children,
  title,
  canGoBack,
  hasTabBar,
}: LayoutProps) {
  return (
    <div>
      <div className="bg-white w-full max-w-lg mx-auto text-lg font-medium py-3 fixed text-gray-800 border-b top-0 flex justify-center items-center">
        {title ? <span>{title}</span> : null}
      </div>

      <div className={cls("pt-16", hasTabBar ? "pb-16" : "")}>{children}</div>

      {hasTabBar ? (
        <nav className="bg-white text-gray-800 border-t fixed bottom-0 pb-10 pt-3 flex justify-between items-center">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </nav>
      ) : null}
    </div>
  );
}
