import type { Metadata } from "next";
import { Anonymous_Pro } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/general.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Background from "@/ui/background";
import { Intro } from "@/ui/intro";
import { Footer } from "@/ui/footer";

const anonymousPro = Anonymous_Pro({
  variable: "--font-anonymous-pro",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://rohanhasabe.com"
      : "http://localhost:3000",
  ),
  title: "Rohan Hasabe",
  description:
    "Rohan Hasabe's portfolio. CS @ Northeastern University, Boston. Software Engineer.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>r</text></svg>",
      },
    ],
  },
  openGraph: {
    title: "Rohan Hasabe",
    description:
      "Rohan Hasabe's portfolio. CS @ Northeastern University, Boston. Software Engineer.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rohan Hasabe Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Hasabe",
    description:
      "Rohan Hasabe's portfolio. CS @ Northeastern University, Boston. Software Engineer.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anonymousPro.variable} antialiased`}>
        <ThemeProvider>
          <Background />
          <Intro />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
