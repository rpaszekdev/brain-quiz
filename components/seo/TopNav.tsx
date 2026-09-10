"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Brain,
  LayoutGrid,
  Menu,
  Sparkles,
  Waypoints,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

/** The one action the bar is really for, kept visually distinct from the links. */
const CTA = { href: "/quiz/label-the-brain", label: "Start a quiz" } as const;

/**
 * One word each, now carrying an icon.
 *
 * This is a quiz platform, so the bar reads as controls rather than prose: a
 * bordered pill per destination and one filled call to action. Quizzes are not
 * a link here — the CTA covers them, and a second entry pointing at the same
 * page would only split the target.
 */
const LINKS: readonly NavLink[] = [
  { href: "/3d-brain-model", label: "Explore", icon: Brain },
  { href: "/browse", label: "Browse", icon: LayoutGrid },
  { href: "/anatomy/corticospinal-tract", label: "Pathways", icon: Waypoints },
  { href: "/mnemonics/cranial-nerves", label: "Mnemonics", icon: Sparkles },
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
        <Link href="/" className="topnav-mark">
          Brain Atlas
        </Link>

        <div className="topnav-links">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={isActive(pathname, link.href)}
            >
              <link.icon size={16} strokeWidth={1.75} aria-hidden />
              {link.label}
            </Link>
          ))}
        </div>

        <Link href={CTA.href} className="topnav-cta">
          {CTA.label}
          <ArrowRight size={16} strokeWidth={2} aria-hidden />
        </Link>

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
              <SheetTitle>Brain Atlas</SheetTitle>
            </SheetHeader>
            <div className="topnav-drawer-links">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  <link.icon size={16} strokeWidth={1.75} aria-hidden />
                  {link.label}
                </Link>
              ))}
              <Link
                href={CTA.href}
                className="topnav-cta"
                onClick={() => setOpen(false)}
              >
                {CTA.label}
                <ArrowRight size={16} strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
