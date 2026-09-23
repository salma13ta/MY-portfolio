'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';

export default function OnboardingPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountdown(prev => (prev <= 1 ? 0 : prev - 1));
        }, 1000);

        const timer = setTimeout(() => {
            localStorage.setItem('onboarded', 'true');
            router.replace('/dashboard/home');
        }, 5000);

        return () => {
            clearTimeout(timer);
            clearInterval(countdownInterval);
        };
    }, [router]);

    return (
        <div className="relative w-full min-h-screen overflow-hidden animated-portfolio-bg flex items-center justify-center px-4 sm:px-6">
            <div className="text-center max-w-xl text-white">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-wide sm:tracking-widest mb-3 sm:mb-4 text-white/95">
                    {t('onboarding.title')}
                </h1>
                <p className="text-xs sm:text-base md:text-lg tracking-wide sm:tracking-[0.15em] leading-relaxed px-2 text-white/85">
                    {t('onboarding.subtitle')}
                </p>
                <p className="text-sm sm:text-lg mt-6 sm:mt-8 font-bold text-white/90">
                    {t('onboarding.redirect').replace('{n}', String(countdown))}
                </p>
            </div>
        </div>
    );
}
