import { HeroUIProvider } from "@heroui/system";
import { Outlet, useHref, useNavigate } from "react-router-dom";

import { Navbar } from "@/widgets/navbar";

export function DefaultLayout() {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <main className="container mx-auto max-w-7xl px-6 flex-grow">
          <Outlet />
        </main>
      </div>
    </HeroUIProvider>
  );
}
