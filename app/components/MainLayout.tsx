"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import type { Lang } from "@/app/i18n/translations";

function Navbar() {
    const { theme, setTheme } = useTheme();
    const { lang, setLang, t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectLang = (next: Lang) => {
        setLang(next);
        setLangOpen(false);
    };

    const isDark = mounted && theme === "dark";

    return (
        <header dir="ltr" className="fixed top-0 inset-x-0 z-50 h-16 border-b border-app-border bg-app-nav transition-colors duration-300">
            <nav className="h-full px-6 md:px-12 flex items-center justify-between">

                <div className="text-2xl tracking-tighter text-app-text select-none cursor-pointer">
                    <span className="text-emerald-600 dark:text-emerald-400 matemasie-font" style={{ fontFamily: "'Matemasie', sans-serif" }}>{t("nav.brand")}</span>
                </div>

                <div className="flex items-center gap-4">

                    <div ref={langRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setLangOpen((open) => !open)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-app-border bg-app-card text-app-text text-sm font-medium cursor-pointer hover:opacity-80 transition-all"
                            aria-expanded={langOpen}
                            aria-haspopup="listbox"
                        >
                            <Globe className="w-4 h-4 dash-muted" />
                            <span>{lang === "ar" ? t("nav.lang.ar") : t("nav.lang.en")}</span>
                            <ChevronDown className={`w-3 h-3 dash-muted transition-transform ${langOpen ? "rotate-180" : ""}`} />
                        </button>

                        {langOpen && (
                            <div className="absolute end-0 mt-2 min-w-[120px] rounded-xl border border-app-border bg-app-card shadow-lg overflow-hidden z-50">
                                {(["en", "ar"] as Lang[]).map((code) => (
                                    <button
                                        key={code}
                                        type="button"
                                        onClick={() => selectLang(code)}
                                        className={`w-full px-4 py-2.5 text-sm text-start transition-colors hover:opacity-80 ${lang === code ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-app-text"}`}
                                    >
                                        {code === "en" ? t("nav.lang.en") : t("nav.lang.ar")}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className="relative w-14 h-8 rounded-full border border-app-border bg-app-card p-1 flex items-center justify-between cursor-pointer transition-all duration-300"
                        aria-label={t("nav.toggleTheme")}
                    >
                        <Sun className="w-3.5 h-3.5 text-amber-500 ms-1 opacity-100 dark:opacity-40 transition-opacity" />
                        <Moon className="w-3.5 h-3.5 text-indigo-400 me-1 opacity-40 dark:opacity-100 transition-opacity" />

                        <div
                            className={`absolute top-[3px] left-[3px] w-6 h-6 rounded-full bg-app-nav border border-app-border shadow-md flex items-center justify-center transition-transform duration-300 ${isDark ? "translate-x-6" : "translate-x-0"}`}
                        >
                            {isDark ? (
                                <Moon className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20" />
                            ) : (
                                <Sun className="w-3.5 h-3.5 text-amber-500" />
                            )}
                        </div>
                    </button>

                </div>
            </nav>
        </header>
    );
}

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { dir } = useLanguage();

    return (
        <div dir={dir} className="min-h-screen bg-transparent text-app-text transition-colors duration-300">
            <Navbar />
            <main className="pt-16">{children}</main>
        </div>
    );
}
