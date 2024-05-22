import { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import store from "../../redux/store";
import { setDarkOrLightMode } from "@/redux/features/darkOrLightMode/darkOrLightModeSlice.js";

const LightOrDarkMode = () => {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#020817";
      store.dispatch(setDarkOrLightMode("dark"));
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
      store.dispatch(setDarkOrLightMode("light"));
    }

    // Save the user's preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialDarkMode() {
    const savedMode = JSON.parse(localStorage.getItem("darkMode") as string);
    if (savedMode !== null) {
      return savedMode;
    }
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return true;
    }
    return false;
  }

  return (
    <div className="">
      <button onClick={() => setDarkMode(!darkMode)} className="">
        <DarkModeSwitch
          checked={!darkMode}
          onChange={() => setDarkMode(!darkMode)}
          size={20}
          moonColor="#000"
          sunColor="#fff"
        />
      </button>
    </div>
  );
};

export default LightOrDarkMode;
