import { ArrowBigRight, ArrowBigRightDash } from "lucide-react";
import { ReactNode } from "react";

interface CustomListProps {
  children: ReactNode;
  className?: string;
}

interface CustomListItemProps {
  children: ReactNode;
  isSubItem?: boolean;
}

export function CustomList({ children, className = "" }: CustomListProps) {
  return <ul className={`space-y-2 ${className}`}>{children}</ul>;
}

export function CustomListItem({
  children,
  isSubItem = false,
}: CustomListItemProps) {
  return (
    <li
      className={`max-w-fit flex items-start gap-2 transition-all duration-300 hover:translate-x-2 group ${isSubItem ? "ml-6" : ""}`}
    >
      {isSubItem ? (
        <ArrowBigRightDash
          size={16}
          className="mt-1 flex-shrink-0 transition-all duration-300 group-hover:rotate-[20deg]"
          style={{ color: "var(--foreground)", opacity: 0.6 }}
        />
      ) : (
        <ArrowBigRight
          size={16}
          className="mt-1 flex-shrink-0 transition-all duration-300 group-hover:rotate-[20deg]"
          style={{ color: "var(--foreground)", opacity: 0.7 }}
        />
      )}
      <span className="flex-1" style={{ color: "var(--list-text-color)" }}>
        {children}
      </span>
    </li>
  );
}
