"use client";

import { SocialIcons } from "@/components/social-icons";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { usePathname } from "next/navigation";

export function Intro() {
  const pathname = usePathname();
  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <div className="flex flex-col py-2 gap-4 border-b-2 sm:flex-row sm:justify-between sm:items-center sm:gap-0">
        <div>
          <h1 className="text-2xl max-w-fit transition-all duration-300 hover:rotate-[-2deg] hover:scale-108">
            <Link href="/">
              <span className="glow">Rohan Hasabe</span>
            </Link>
          </h1>
          <TypeAnimation
            sequence={[
              "CS @ Northeastern University",
              2000,
              "Software Engineer, Boston",
              2000,
            ]}
            wrapper="span"
            speed={50}
            style={{}}
            repeat={Infinity}
            className="italic"
          />
        </div>
        <div className="social-icons sm:ml-auto">
          <SocialIcons />
        </div>
      </div>
      <div className="navbar mt-1 font-bold">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className={pathname.startsWith("/blog") ? "active" : ""}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
