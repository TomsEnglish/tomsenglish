"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";

export default function Nav({ items }: any) {
  return (
    <div className="bg-primary-card w-full flex flex-col items-center">
    <header className="flex container-fluid py-5 justify-between items-center ">
      <Link href="/" className="font-teachers text-2xl">
        Tom's English
      </Link>
      <nav className="flex flex-row">
        <div className="hidden md:flex">
          <Content items={items} />
        </div>
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Menu color="black" size={24} className="flex md:hidden" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="flex flex-row items-center justify-between">
              <div className="w-[30px]" />
              <DrawerTitle>Menu</DrawerTitle>
              <DrawerClose className="flex size-[30px] items-center justify-center">
                <Menu color="black" size={24} />
              </DrawerClose>
            </DrawerHeader>
            <Content items={items} />
          </DrawerContent>
        </Drawer>
      </nav>
    </header>
    </div>
  );
}

const Content = ({ items }: any) => {
  return (
    <ul className="flex flex-col items-center gap-4 md:gap-0 md:flex-row list-none m-0!">
      {items.map((link: any, idx: number) => (
        <li key={idx}>{link}</li>
      ))}
    </ul>
  );
};
