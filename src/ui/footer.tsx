"use client";

import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  const currYear = new Date().getFullYear();
  return (
    <>
      <footer className="max-w-xl mx-auto mt-4 mb-12 px-4">
        <div className="border-t-2 pt-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <p>{currYear} Rohan Hasabe</p>
          </div>
        </div>
      </footer>
    </>
  );
}
