import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Avatar } from "@heroui/react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ThemeSwitch } from "@/features/theme-switch/theme-switch";
import { SearchIcon, Logo } from "@/shared/ui/icons/icons";
import LogoutButton from "@/features/session/logout/logout.ui";
import { sessionQueryOptions } from "@/entities/session/session.api";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { data: session } = useQuery(sessionQueryOptions);

  const navItems = [
    { label: "Home", href: "/" },
    ...(session ? [
      { label: "Discover", href: "/test" },
      { label: "Create", href: "/editor" },
      { label: "Profile", href: `/profile/${session.name}` },
    ] : []),
  ];

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-white/20 backdrop-blur-md group-data-[hover=true]:bg-white/30",
        input: "text-sm text-white placeholder:text-white/60",
      }}
      labelPlacement="outside"
      placeholder="Search quizzes..."
      startContent={
        <SearchIcon className="text-base text-white/60 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const authButton = (
    <>
      {session ? (
        <div className="flex items-center gap-3">
          <Avatar
            className="w-8 h-8 text-[10px] ring-2 ring-white/30"
            color="secondary"
            name={session.name[0]}
            size="sm"
            src={session.avatar || undefined}
          />
          <LogoutButton />
        </div>
      ) : (
        <Button
          as={NavLink}
          className="text-sm font-bold bg-white text-purple-700 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all"
          to={"/login"}
          size="sm"
          onClick={() => setIsMenuOpen(false)}
        >
          Sign In
        </Button>
      )}
    </>
  );

  return (
    <HeroUINavbar
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      className="kahoot-gradient border-b-0 shadow-lg"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            as={NavLink}
            className="flex justify-start items-center gap-2"
            color="foreground"
            to={"/"}
          >
            <div className="bg-white rounded-lg p-1.5 shadow-md">
              <Logo className="text-purple-700 w-5 h-5" />
            </div>
            <p className="font-black text-xl text-white tracking-tight">TestFlow</p>
          </Link>
        </NavbarBrand>
        <div className="hidden md:flex gap-1 justify-start ml-4">
          {navItems.map((item) => (
            <NavbarItem key={item.href} isActive={pathname === item.href}>
              <NavLink
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-white/20 text-white shadow-sm"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`
                }
                to={item.href}
              >
                {item.label}
              </NavLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex">
          <div className="w-48">{searchInput}</div>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <div className="flex items-center gap-3">
            <ThemeSwitch />
            {authButton}
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle className="text-white" />
      </NavbarContent>

      <NavbarMenu className="bg-white/95 dark:bg-[#0F0F23]/95 backdrop-blur-xl pt-6">
        <div className="px-4 mb-4">{searchInput}</div>
        <div className="mx-4 mt-2 flex flex-col gap-1">
          {navItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <NavLink
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base transition-all ${
                    isActive
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </div>

        <div className="mx-4 mb-12 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          {authButton}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};