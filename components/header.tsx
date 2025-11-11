"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  // Optional: toggle a class on the body to match your old behavior
  useEffect(() => {
    if (isMobileNavActive) {
      document.body.classList.add("mobile-nav-active");
    } else {
      document.body.classList.remove("mobile-nav-active");
    }
  }, [isMobileNavActive]);

  const toggleMobileNav = () => {
    setIsMobileNavActive((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    if (isMobileNavActive) {
      setIsMobileNavActive(false);
    }
  };

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <Link href="/" className="logo d-flex align-items-center me-auto">
          <h1 className="sitename">tomseng</h1>
        </Link>

        {/* Nav Menu */}
        <nav
          id="navmenu"
          className={`navmenu ${isMobileNavActive ? "mobile-nav-active" : ""}`}
        >
          <ul>
            <li>
              <Link
                href="/"
                className={pathname === "/" ? "active" : ""}
                onClick={handleNavLinkClick}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={pathname === "/about" ? "active" : ""}
                onClick={handleNavLinkClick}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={pathname === "/pricing" ? "active" : ""}
                onClick={handleNavLinkClick}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className={pathname === "/events" ? "active" : ""}
                onClick={handleNavLinkClick}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={pathname === "/blog" ? "active" : ""}
                onClick={handleNavLinkClick}
              >
                Blog
              </Link>
            </li>
          </ul>

          {/* Mobile toggle button */}
          <i
            className={`mobile-nav-toggle d-xl-none bi ${
              isMobileNavActive ? "bi-x" : "bi-list"
            }`}
            onClick={toggleMobileNav}
          />
        </nav>

        <Link href="/enroll" className="btn-getstarted">
          Enroll Now
        </Link>
      </div>
    </header>
  );
};
