import { CustomList, CustomListItem } from "@/ui/custom-list";
import Link from "next/link";

export function Activity() {
  return (
    <div className="max-w-xl mx-auto my-4 px-4 home-page-content">
      <CustomList>
        <CustomListItem>
          <p className="font-bold">Currently:</p>
        </CustomListItem>
        <CustomListItem isSubItem>
          Master&apos;s in CS @{" "}
          <Link href="https://www.northeastern.edu" target="_blank">
            Northeastern University
          </Link>
          , Boston
        </CustomListItem>
        <CustomListItem isSubItem>
          Graduating May 2026
        </CustomListItem>
        <CustomListItem isSubItem>
          Open to roles in general software engineering, backend, and AI tooling
        </CustomListItem>

        <div className="my-4" />

        <CustomListItem>
          <p className="font-bold">Recently:</p>
        </CustomListItem>
        <CustomListItem isSubItem>
          Software Development Engineer II @{" "}
          <Link href="https://www.esper.io" target="_blank">
            Esper.io
          </Link>
        </CustomListItem>
        <CustomListItem isSubItem>
          Built AI agents and MCP servers for developer workflows
        </CustomListItem>
        <CustomListItem isSubItem>
          Experiments with agentic coding and workflow automation
        </CustomListItem>

        <div className="my-4" />

        <CustomListItem>
          <p className="font-bold">About:</p>
        </CustomListItem>
        <CustomListItem isSubItem>
          If you find someone with the username{" "}
          <span className="pink font-mono">Hasaber8</span> on any platform, you can be mostly sure it&apos;s me
        </CustomListItem>

        <div className="my-4" />

        <CustomListItem>
          My resume is available{" "}
          <Link href="/resume.pdf" target="_blank" prefetch={false}>
            here
          </Link>
          .
        </CustomListItem>
      </CustomList>
      <div className="my-4" />
    </div>
  );
}
