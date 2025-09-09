'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/Button';
export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        // Check if theme is stored in localStorage or system preference
        const stored = localStorage.getItem('theme');
        const isDarkMode = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDark(isDarkMode);
        updateTheme(isDarkMode);
    }, []);
    const updateTheme = (dark) => {
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };
    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        updateTheme(newTheme);
    };
    return (_jsx(Button, { variant: "ghost", size: "sm", onClick: toggleTheme, "aria-label": isDark ? 'Switch to light mode' : 'Switch to dark mode', className: "w-9 h-9 p-0", children: isDark ? _jsx(Sun, { className: "h-4 w-4" }) : _jsx(Moon, { className: "h-4 w-4" }) }));
}
//# sourceMappingURL=ThemeToggle.js.map