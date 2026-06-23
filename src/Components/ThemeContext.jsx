import React, {createContext, useState,useEffect} from "react";
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    } );

    useEffect(() => {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');

        }else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light' );
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}