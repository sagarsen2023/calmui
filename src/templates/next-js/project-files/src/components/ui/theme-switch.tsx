"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [icon, setIcon] = useState<ReactNode>(<Sun color="white" />);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setIcon(theme === "dark" ? <Sun /> : <Moon />);
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="scale-95 rounded-full"
      onClick={toggleTheme}
    >
      {icon}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeSwitch;
