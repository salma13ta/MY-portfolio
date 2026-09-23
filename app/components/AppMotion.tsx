"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function AppMotion({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
        restDelta: 0.001,
    });

    return (
        <>
            <motion.div
                className="scroll-progress"
                style={{ scaleX: reduceMotion ? 0 : progress }}
                aria-hidden="true"
            />
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={pathname}
                    className="route-transition"
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </>
    );
}
