import { useEffect, useState } from "react";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";

const getInitialTheme = () => {
    if (typeof window === "undefined") {
        return "dark";
    }

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
};

function App() {
    const [theme, setTheme] = useState(getInitialTheme);
    const isLightMode = theme === "light";

    useEffect(() => {
        document.documentElement.classList.toggle("theme-light", isLightMode);
        localStorage.setItem("theme", theme);
    }, [isLightMode, theme]);

    const toggleTheme = () => {
        setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light");
    };

    return (
        <MainLayout>
            <Dashboard
                isLightMode={isLightMode}
                onToggleTheme={toggleTheme}
            />
        </MainLayout>
    );
}

export default App;
