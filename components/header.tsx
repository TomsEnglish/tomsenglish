"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-active", isMobileNavActive);
  }, [isMobileNavActive]);

  const closeMobileNav = () => {
    setIsMobileNavActive(false);
  };

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl d-flex align-items-center">
        <Link href="/" className="logo d-flex align-items-center">
          <h1>Tom&apos;s English</h1>
        </Link>

        <nav
          id="navmenu"
          className={`navmenu ${isMobileNavActive ? "mobile-nav-active" : ""}`}
        >
          <ul>
            {/* <li>
              <Link
                href="/"
                className={pathname === "/" ? "active" : ""}
                onClick={closeMobileNav}
              >
                Home
              </Link>
            </li> */}

            <NavDropdown
              title="Services"
              items={SERVICES}
              pathname={pathname}
              isMobileNavActive={isMobileNavActive}
              onLinkClick={closeMobileNav}
            />

            <li>
              <Link
                href="/pricing"
                className={pathname === "/pricing" ? "active" : ""}
                onClick={closeMobileNav}
              >
                Pricing
              </Link>
            </li>

            <NavDropdown
              title="Resources"
              items={RESOURCES}
              pathname={pathname}
              isMobileNavActive={isMobileNavActive}
              onLinkClick={closeMobileNav}
            />
          </ul>

          <button
            type="button"
            className={`mobile-nav-toggle d-xl-none bi ${
              isMobileNavActive ? "bi-x" : "bi-list"
            }`}
            aria-label="Toggle navigation"
            onClick={() => setIsMobileNavActive((prev) => !prev)}
          />
        </nav>

        <Link href="/contact" className="btn-getstarted">
          Contact me
        </Link>
      </div>
    </header>
  );
};

const SERVICES = [
  { href: "/general-english", label: "General English" },
  { href: "/business-english", label: "Business English" },
  { href: "/international-exam-prep", label: "International Exam Prep" },
];

const RESOURCES = [{ href: "/phrasal-verbs", label: "Phrasal Verbs" }];

type DropdownItem = {
  href: string;
  label: string;
};

type NavDropdownProps = {
  title: string;
  items: DropdownItem[];
  pathname: string;
  isMobileNavActive: boolean;
  onLinkClick: () => void;
};

const NavDropdown = ({
  title,
  items,
  pathname,
  isMobileNavActive,
  onLinkClick,
}: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to check if any child link is active
  const isChildActive = items.some((item) => pathname === item.href);

  return (
    <li className={`dropdown ${isOpen ? "active" : ""}`}>
      <a
        href="#"
        className={isChildActive ? "active" : ""}
        onClick={(e) => {
          e.preventDefault();
          if (isMobileNavActive) setIsOpen(!isOpen);
        }}
      >
        <span>{title}</span>
        <i className="bi bi-chevron-down toggle-dropdown" />
      </a>

      <ul className={isMobileNavActive && !isOpen ? "d-none" : "d-block"}>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={pathname === item.href ? "active" : ""}
              onClick={() => {
                setIsOpen(false);
                onLinkClick();
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};
