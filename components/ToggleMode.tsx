"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

function ToggleMode() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = theme === "dark";
  if (!mounted) {
    return <Button variant="outline" size="icon" disabled />;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(`${dark ? "light" : "dark"}`)}
    >
      {dark ? (
        <Sun className="cursor-pointer hover: text-primary" />
      ) : (
        <Moon className="cursor-pointer hover: text-primary" />
      )}
    </Button>
  );
}

export default ToggleMode;
