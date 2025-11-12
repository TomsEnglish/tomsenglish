"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };

    // Set initial visibility and add scroll listener
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      href="#"
      onClick={scrollToTop}
      className={`scroll-top d-flex align-items-center justify-content-center ${
        visible ? "active" : ""
      }`}
    >
      <i className="bi bi-arrow-up-short"></i>
    </Link>
  );
};
