"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HomeIcon, InfoIcon, Mail, Menu, Settings } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const navigationLinks = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "About", href: "/about", icon: InfoIcon },
  { name: "Services", href: "/services", icon: Settings },
  { name: "Contact", href: "/contact", icon: Mail },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    //main header
    <header className="sticky top-0 z-50 w-full mx-auto border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/*container for navbar content */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between p-4">
        {/*logo section*/}
        <Link href="/" className="text-2xl font-bold">
          <span className="text-2xl font-bold">Logo</span>
        </Link>

        {/*navigation links*/}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center justify-center text-sm font-medium transition-colors hover:text-primary gap-2"
            >
              {link.icon && <link.icon className="w-5 h-5" />}
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button className="hidden md:inline-flex cursor-pointer" size="sm">
            Get Started
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="border-t flex flex-col gap-6 mt-10 px-4 pt-6">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-start justify-baseline font-medium transition-colors hover:text-primary gap-4"
                  >
                    {link.icon && <link.icon className="w-6 h-6" />}
                    {link.name}
                  </Link>
                ))}
                <Button className="mt-4 w-full">Get Started</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
