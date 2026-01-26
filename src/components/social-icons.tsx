import { Twitter, Mail, Linkedin, Github, FileText } from "lucide-react";
import { SOCIAL_ICON_SIZE } from "@/constants/icons";

export function SocialIcons() {
  return (
    <>
      <ul className="flex space-x-1 sm:space-x-1 gap-4 sm:gap-0 pb-4 sm:pb-0">
        <li className="p-0 sm:p-2">
          <a
            href="https://twitter.com/hasaber8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center transition-all duration-300 hover:rotate-[15deg] hover:text-[#1DA1F2]"
          >
            <Twitter size={SOCIAL_ICON_SIZE} />
          </a>
        </li>
        <li className="p-0 sm:p-2">
          <a
            href="https://github.com/Hasaber8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center transition-all duration-300 hover:rotate-[15deg] hover:text-[#6366f1]"
          >
            <Github size={SOCIAL_ICON_SIZE} />
          </a>
        </li>
        <li className="p-0 sm:p-2">
          <a
            href="https://www.linkedin.com/in/hasaber8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center transition-all duration-300 hover:rotate-[15deg] hover:text-[#0077B5]"
          >
            <Linkedin size={SOCIAL_ICON_SIZE} />
          </a>
        </li>
        <li className="p-0 sm:p-2">
          <a
            href="mailto:hasabe.r@northeastern.edu"
            className="flex items-center justify-center transition-all duration-300 hover:rotate-[15deg] hover:text-[#FF4D00]"
          >
            <Mail size={SOCIAL_ICON_SIZE} />
          </a>
        </li>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hidden sm:block"
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "")}
        >
          <li
            className="border-2 py-1 px-2 rounded ml-2"
            style={{
              borderColor: "#660000",
            }}
          >
            <div className="flex items-center space-x-1">
              <FileText size={SOCIAL_ICON_SIZE} />
              <span className="text-sm">Resume</span>
            </div>
          </li>
        </a>
      </ul>
    </>
  );
}
