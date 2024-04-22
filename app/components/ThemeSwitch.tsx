"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IoSunnySharp, IoMoon } from "react-icons/io5";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <IoSunnySharp className="text-2xl text-blue1" /> : <IoMoon className="text-2xl text-blue1" />}
    </button>
  );
};

export default ThemeSwitch;
