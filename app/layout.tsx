import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import AppMotion from "./components/AppMotion";
import ThreeBackground from "./components/ThreeBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salma — Portfolio",
  description: "Frontend developer portfolio — React, Next.js, and polished digital experiences.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="animated-portfolio-bg">
        <ThreeBackground />
        <div className="binary-rain" aria-hidden="true">
          {Array.from({ length: 14 }, (_, index) => (
            <span key={index}>00110001</span>
          ))}
        </div>
        <Providers>
          <AppMotion>{children}</AppMotion>
        </Providers>
      </body>
    </html>
  );
}