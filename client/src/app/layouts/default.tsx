import { HeroUIProvider } from "@heroui/system";
import { Link } from "@heroui/link";
import { Outlet, useHref, useNavigate } from "react-router-dom";

import { Navbar } from "@/widgets/navbar";

export function DefaultLayout() {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
          <Outlet />
        </main>
        <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://heroui.com"
            title="heroui.com homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">HeroUI</p>
          </Link>
        </footer>
      </div>
    </HeroUIProvider>
  );
}
