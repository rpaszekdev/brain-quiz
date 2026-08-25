"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavLink {
  href: string;
  kana: string;
  label: string;
}

/** One-word labels, kana mark alongside. Kanso — nothing else earns a slot. */
const LINKS: readonly NavLink[] = [
  { href: "/", kana: "脳", label: "Atlas" },
  { href: "/browse", kana: "一覧", label: "Browse" },
  { href: "/quiz/label-the-brain", kana: "試験", label: "Quizzes" },
  { href: "/mnemonics/cranial-nerves", kana: "記憶", label: "Mnemonics" },
  { href: "/3d-brain-model", kana: "模型", label: "3D model" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  const section = href.split("/")[1];
  return pathname.startsWith(`/${section}`);
}

/**
 * Persistent top bar.
 *
 * Lives in the root layout so it is present on the 3D app and on every content
 * page. Collapses to a drawer under 720px rather than wrapping to two lines.
 */
export function TopNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  return (
    <nav className="topnav" aria-label="Main">
      <div className="topnav-inner">
        <Link href="/" className="topnav-mark" aria-label="Brain Atlas home">
          脳
        </Link>

        <div className="topnav-links">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={isActive(pathname, link.href)}
            >
              <span className="topnav-kana" aria-hidden="true">
                {link.kana}
              </span>
              {link.label}
            </Link>
          ))}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          {/* Base UI (shadcn v4) uses `render`, not Radix's `asChild`. */}
          <SheetTrigger
            className="topnav-toggle"
            aria-label="Open menu"
            render={<button type="button" />}
          >
            <Menu size={20} />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>脳 Brain Atlas</SheetTitle>
            </SheetHeader>
            <div className="topnav-drawer-links">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  <span className="topnav-kana" aria-hidden="true">
                    {link.kana}
                  </span>
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
