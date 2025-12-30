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
        <Link href="/" className="logo d-flex align-items-center me-auto">
          <h1>Tom&apos;s English</h1>
        </Link>

        <nav
          id="navmenu"
          className={`navmenu ${isMobileNavActive ? "mobile-nav-active" : ""}`}
        >
          <ul>
            <li>
              <Link
                href="/"
                className={pathname === "/" ? "active" : ""}
                onClick={closeMobileNav}
              >
                Home
              </Link>
            </li>

            <ServicesNav
              pathname={pathname}
              isMobileNavActive={isMobileNavActive}
              onLinkClick={closeMobileNav}
            />

            <li>
              <Link
                href="/prices"
                className={pathname === "/prices" ? "active" : ""}
                onClick={closeMobileNav}
              >
                Prices
              </Link>
            </li>
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

type ServicesNavProps = {
  pathname: string;
  isMobileNavActive: boolean;
  onLinkClick: () => void;
};

const ServicesNav = ({
  pathname,
  isMobileNavActive,
  onLinkClick,
}: ServicesNavProps) => {
  // MOBILE: flatten services into the main list
  if (isMobileNavActive) {
    return (
      <>
        {SERVICES.map((service) => (
          <li key={service.href}>
            <Link
              href={service.href}
              className={pathname === service.href ? "active" : ""}
              onClick={onLinkClick}
            >
              {service.label}
            </Link>
          </li>
        ))}
      </>
    );
  }

  // DESKTOP: dropdown
  return (
    <li className="dropdown">
      <a href="#">
        <span>Services</span>
        <i className="bi bi-chevron-down toggle-dropdown" />
      </a>

      <ul>
        {SERVICES.map((service) => (
          <li key={service.href}>
            <Link
              href={service.href}
              className={pathname === service.href ? "active" : ""}
              onClick={onLinkClick}
            >
              {service.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};
