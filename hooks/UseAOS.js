"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export const UseAOS = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return null;
};
