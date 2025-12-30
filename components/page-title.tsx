"use client";

import { usePathname } from "next/navigation";

export const PageTitle = () => {
  const pathname = usePathname();

  const title = pathname
    .replace(/^\/+/, "") // remove leading slash
    .replace(/-+/g, " ") // dashes → spaces
    .replace(/\b[a-z]/g, (c) => c.toUpperCase());

  if (pathname != "/")
    return (
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">{title}</h1>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <a href="/">Home</a>
              </li>
              <li className="current">{title}</li>
            </ol>
          </nav>
        </div>
      </div>
    );
};
