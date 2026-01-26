"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";

interface GridOverlayProps {
  x: number;
  y: number;
}

interface GridContainerProps {
  isDarkMode: boolean;
}

interface GlassBackgroundProps {
  isDarkMode: boolean;
}

const GridContainer: React.FC<
  GridContainerProps & { children: React.ReactNode }
> = ({ isDarkMode, children }) => {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: isMobile ? "200vh" : "100%",
        minHeight: isMobile ? "200vh" : "100%",
        backgroundColor: isDarkMode ? "#1a1a1a" : "white",
        overflow: "hidden",
        zIndex: -100,
      }}
    >
      {children}
    </div>
  );
};

const GridOverlay: React.FC<GridOverlayProps> = ({ x, y }) => {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  return (
    <div
      style={{
        position: "absolute",
        top: isMobile ? 0 : "-50%",
        left: isMobile ? 0 : "-50%",
        width: isMobile ? "100%" : "200%",
        height: isMobile ? "200vh" : "200%",
        minHeight: isMobile ? "200vh" : "200%",
        backgroundImage:
          "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
        backgroundSize: "35px 35px",
        pointerEvents: "none",
        transform: isMobile ? "none" : `translate(${-x / 75}px, ${-y / 75}px)`,
      }}
    />
  );
};

const GlassBackground: React.FC<GlassBackgroundProps> = ({ isDarkMode }) => {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: isMobile ? "200vh" : "100%",
        minHeight: isMobile ? "200vh" : "100%",
        background: isDarkMode
          ? "rgba(18, 18, 18, 0.5)"
          : "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(0.5px)",
        WebkitBackdropFilter: "blur(1px)",
        border: `1px solid ${
          isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)"
        }`,
        boxShadow: `0 0 6px ${
          isDarkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.1)"
        }`,
        zIndex: -99,
      }}
    />
  );
};

const Grid: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, isLoaded } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Check if device supports touch
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0,
      );
    };

    checkTouchDevice();

    const handleMouseMove = (event: MouseEvent) => {
      if (!isTouchDevice) {
        setMousePosition({ x: event.clientX, y: event.clientY });
      }
    };

    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (!isTouchDevice) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isTouchDevice, isMounted]);

  // Don't render until theme is loaded and component is mounted to avoid hydration mismatch
  if (!isLoaded || !isMounted) {
    return null;
  }

  return (
    <>
      <GridContainer isDarkMode={isDarkMode}>
        <GridOverlay
          x={isTouchDevice ? 0 : mousePosition.x}
          y={isTouchDevice ? 0 : mousePosition.y}
        />
      </GridContainer>
      <GlassBackground isDarkMode={isDarkMode} />
    </>
  );
};

export default Grid;
