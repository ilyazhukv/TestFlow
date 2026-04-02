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
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

import { siteConfig } from "@/app/config/site.config";
import { ThemeSwitch } from "@/features/theme-switch/theme-switch";
import { SearchIcon } from "@/shared/ui/icons/icons";
import { Logo } from "@/shared/ui/icons/icons";
import { store } from "@/shared/store";
import LogoutButton from "@/features/session/logout/logout.ui";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
  const authButton = (
    <>
      {store.getState().session ? (
        <LogoutButton onClick={() => setIsMenuOpen(false)} />
      ) : (
        <Button
          as={NavLink}
          className="text-sm font-normal text-default-600 bg-default-100 w-full"
          to={"/login"}
          variant="flat"
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
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            as={NavLink}
            className="flex justify-start items-center gap-1"
            color="foreground"
            to={"/"}
          >
            <Logo />
            <p className="font-bold text-inherit">TESTFLOW</p>
          </Link>
        </NavbarBrand>
        <div className="hidden md:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} isActive={pathname === item.href}>
              <Link
                as={NavLink}
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                to={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">{authButton}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                as={NavLink}
                color="foreground"
                size="lg"
                to={`${item.href}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>

        <div className="mx-4 mb-12 mt-auto">{authButton}</div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
