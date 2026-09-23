'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    CheckCircle2,
    Sparkles,
    Zap,
    Code2,
    MessageCircle,
    Check,
    Globe,
    ArrowRight,
    User,
    Briefcase,
    ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { openWhatsApp } from '@/app/lib/whatsapp';

const easeOut = [0.22, 1, 0.36, 1] as const;
const GITHUB_PROFILE_URL = 'https://github.com/salma13ta';
const GITHUB_AVATAR_URL = `${GITHUB_PROFILE_URL}.png?size=800`;

function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

function LinkedInIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

const TOOLKIT = {
    development: [
        'TypeScript',
        'React.js',
        'Next.js',
        'Redux Toolkit',
        'Three.js',
        'Tailwind CSS',
    ],
    designAndMarketing: [
        'UI/UX & Graphic Design',
        'Canva Pro',
        'Digital & Social Media Marketing',
    ],
} as const;

export default function HomePage() {
    const router = useRouter();
    const { t, dir } = useLanguage();
    const reduceMotion = useReducedMotion();
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const slideX = dir === 'rtl' ? -32 : 32;

    const heroContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: reduceMotion
                ? { duration: 0 }
                : { staggerChildren: 0.1, delayChildren: 0.15 },
        },
    };

    const heroItem: Variants = {
        hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: reduceMotion ? 0 : 0.65, ease: easeOut },
        },
    };

    const heroCard: Variants = {
        hidden: reduceMotion
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: slideX, scale: 0.97 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: reduceMotion ? 0 : 0.85,
                ease: easeOut,
                delay: reduceMotion ? 0 : 0.25,
            },
        },
    };

    const scrollRevealVariant: Variants = {
        hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: reduceMotion ? 0 : 0.6, ease: easeOut },
        },
    };

    const servicesListVariant: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: reduceMotion ? { duration: 0 } : { staggerChildren: 0.08 },
        },
    };

    const serviceCardVariant: Variants = {
        hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: reduceMotion ? 0 : 0.4, ease: easeOut },
        },
    };

    const experiences = [
        {
            company: 'Marketing',
            role: 'Technical Marketer & Web Developer ',
            duration: `2024 - ${t('experience.present')}`,
            icon: Sparkles,
        },
        {
            company: t('experience.freelance'),
            role: t('experience.freelanceRole'),
            duration: '2023 - 2024',
            icon: CheckCircle2,
        },
        {
            company: t('experience.agency'),
            role: t('experience.agencyRole'),
            duration: `2024 - ${t('experience.present')}`,
            icon: CheckCircle2,
        },
    ];

    const services = [
        {
            id: 'web',
            icon: Globe,
            title: t('services.web.title'),
            subtitle: t('services.web.subtitle'),
            description: t('services.web.desc'),
            gradient: 'from-[#10ad43] to-[#428658]',
            features: [
                'Responsive & Mobile-First Design',
                'Reusable Components Architecture',
                'Type-Safe Architecture ',
                'Immersive 3D Graphics & WebGL ',
                'Server-Side Rendering & SEO',
                'State Management with Redux Toolkit',
                'API Integration & Data Fetching',
                'Performance & Animation Optimization ',
                'Interactive UI & Glassmorphism Design',
            ],
            technologies: ['React.js', 'Next.js', 'TypeScript', 'Three.js', 'Redux Toolkit', 'Tailwind CSS'],
        },
    ];

    const heroHighlights = [
        { icon: Sparkles, text: t('home.hero.feature1') },
        { icon: Code2, text: t('home.hero.feature2') },
        { icon: Zap, text: t('home.hero.feature3') },
    ];

    const cardClass = 'dash-card rounded-2xl shadow-sm backdrop-blur-md';

    return (
        <>
            <style>{`
                @keyframes float-glow {
                    0%, 100% { opacity: 0.05; }
                    50% { opacity: 0.15; }
                }
                @keyframes hero-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }
                @media (prefers-reduced-motion: reduce) {
                    @keyframes float-glow { 0%, 100% { opacity: 0.08; } }
                    @keyframes hero-float { 0%, 100% { transform: none; } }
                }
            `}</style>

            <div className="dash-page relative overflow-x-hidden">
                {/* Hero */}
                <section id="home" className="relative overflow-hidden border-b border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#002c22]/10 via-transparent to-transparent pointer-events-none" />
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-10 sm:py-14 md:py-20 lg:py-24">
                        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
                            <motion.div
                                variants={heroCard}
                                initial="hidden"
                                animate="visible"
                                className="rounded-2xl sm:rounded-3xl border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl shadow-black/50 order-1 lg:order-2"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b border-white/10">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <a
                                            href={GITHUB_PROFILE_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Open Salma's GitHub profile"
                                            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-emerald-300/40 shrink-0"
                                        >
                                            <Image
                                                src={GITHUB_AVATAR_URL}
                                                alt="Salma's GitHub profile"
                                                fill
                                                sizes="40px"
                                                className="object-cover"
                                            />
                                        </a>
                                        <div className="min-w-0">
                                            <p className="text-gray-600 font-semibold text-sm truncate">{t('home.hero.name')}</p>
                                            <p className="text-gray-400 text-xs truncate">{t('home.hero.subtitle')}</p>
                                        </div>
                                    </div>
                                    <span className="self-start sm:self-auto text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-app-text-p border border-white/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0">
                                        {t('home.hero.craftSystem')}
                                    </span>
                                </div>

                                <div className="hero-image-frame relative mx-3 sm:mx-4 mt-3 sm:mt-4 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#0d1f1a] aspect-[4/3] sm:aspect-[16/11]">
                                    <motion.div
                                        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.35),transparent_65%)]"
                                        animate={reduceMotion ? undefined : { opacity: [0.35, 0.65, 0.35], scale: [1, 1.06, 1] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                    <div className="absolute inset-0 overflow-hidden">
                                        <a
                                            href={GITHUB_PROFILE_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Open Salma's GitHub profile"
                                            className="block h-full w-full"
                                        >
                                            <Image
                                                src={GITHUB_AVATAR_URL}
                                                alt="Salma's GitHub profile"
                                                fill
                                                sizes="(max-width: 640px) 100vw, 50vw"
                                                className="hero-github-image object-contain p-5 sm:p-8 opacity-95"
                                                priority
                                            />
                                        </a>
                                    </div>

                                    <motion.span
                                        initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: reduceMotion ? 0 : 0.9, duration: 0.5 }}
                                        className="absolute top-2 sm:top-3 start-2 sm:start-3 inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/60 border border-white/10 text-[9px] sm:text-[10px] text-white backdrop-blur-sm max-w-[calc(100%-1rem)]"
                                    >
                                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                                        <span className="truncate ">{t('home.hero.productionReady')}</span>
                                    </motion.span>

                                    <motion.span
                                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: reduceMotion ? 0 : 1.05, duration: 0.5 }}
                                        style={reduceMotion ? undefined : { animation: 'hero-float 3s ease-in-out infinite' }}
                                        className="absolute bottom-2 sm:bottom-3 end-2 sm:end-3 inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/60 border border-white/10 text-[9px] sm:text-[10px] text-white backdrop-blur-sm"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#009966]" />
                                        {t('home.hero.liveReady')}
                                    </motion.span>
                                </div>

                                <div className="grid  sm:gap-3 p-3 sm:p-4">
                                    <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
                                        <p className="text-gray-500 font-semibold text-sm leading-snug mb-1.5">
                                            {t('home.hero.cardTitle')}
                                        </p>
                                        <p className="text-gray-400 text-sm leading-snug">
                                            {t('home.hero.cardDesc')}
                                        </p>
                                    </div>

                                    {/* <div className="relative grid grid-rows-2 gap-2.5 sm:gap-3">
                                        <motion.span
                                            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: reduceMotion ? 0 : 1.35, duration: 0.45 }}
                                            style={reduceMotion ? undefined : { animation: 'hero-float 4s ease-in-out infinite 0.5s' }}
                                            className="absolute -top-2 end-2 inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[color-mix(in_oklab,lab(56_-45.31_16.82)_15%,transparent)] border border-[color-mix(in_oklab,lab(56_-45.31_16.82)_15%,transparent)] text-[9px] sm:text-[10px] text-[lab(56_-45.31_16.82)]"
                                        >
                                            <PhoneIcon className="w-3 h-3" />
                                            {t('home.hero.responsive')}
                                        </motion.span>

                                        <motion.div
                                            initial={reduceMotion ? false : { opacity: 0, x: dir === 'rtl' ? -16 : 16 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: reduceMotion ? 0 : 1.1, duration: 0.5 }}
                                            className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-3 flex flex-col justify-center"
                                        >
                                            <span className="text-[#4a6449bd] font-bold text-sm">{t('home.hero.gsap')}</span>
                                            <span className="text-neutral-500 text-xs">{t('home.hero.motion')}</span>
                                        </motion.div>
                                        <motion.div
                                            initial={reduceMotion ? false : { opacity: 0, x: dir === 'rtl' ? -16 : 16 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: reduceMotion ? 0 : 1.2, duration: 0.5 }}
                                            className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-3 flex flex-col justify-center"
                                        >
                                            <span className="text-[#4a6449bd] font-bold text-sm">{t('home.hero.ts')}</span>
                                            <span className="text-neutral-500 text-xs">{t('home.hero.cleanCode')}</span>
                                        </motion.div>


                                    </div> */}
                                </div>
                            </motion.div>
                            <motion.div
                                variants={heroContainer}
                                initial="hidden"
                                animate="visible"
                                className="space-y-5 sm:space-y-7 order-2 lg:order-1"
                            >
                                <motion.p
                                    variants={heroItem}
                                    className="text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[lab(56_-45.31_16.82)] font-semibold"
                                >
                                    {t('home.hero.role')}
                                </motion.p>

                                <motion.div variants={heroItem} className="space-y-1">
                                    <h1
                                        className="hero-serif text-[2rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-[4.25rem] lg:leading-[1.05] text-app-text-h1 tracking-tight"
                                        style={{ fontFamily: 'Amarante, Amarante Fallback' }}
                                    >
                                        {t('home.hero.headline1')}
                                    </h1>
                                    <h1
                                        className="hero-serif text-[1.65rem] leading-[1.1] sm:text-3xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.05] text-app-text-h1 tracking-tight"
                                        style={{ fontFamily: 'Amarante, Amarante Fallback' }}
                                    >
                                        {t('home.hero.headline2')}
                                    </h1>
                                    <p
                                        className="hero-serif text-gray-400 text-xs sm:text-sm pt-1 max-w-lg"
                                        style={{ fontFamily: 'Amarante, Amarante Fallback' }}
                                    >
                                        {t('home.hero.bio')}
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={heroItem}
                                    className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-start gap-2.5 sm:gap-3 pt-1"
                                >
                                    <motion.button
                                        whileHover={reduceMotion ? undefined : { scale: 1.04, borderColor: 'rgba(66, 251, 60, 0.6)', backgroundColor: 'rgba(66, 251, 60, 0.1)' }}
                                        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                                        onClick={() => router.push('/dashboard/Portfolio')}
                                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#c1cbd3] bg-white/5 text-app-text-h1 text-sm font-semibold cursor-pointer transition-colors w-full sm:w-auto"
                                    >
                                        <ArrowRight className="w-4 h-4 text-[lab(56_-45.31_16.82)] rtl:rotate-180" />
                                        {t('home.hero.viewWork')}
                                    </motion.button>

                                    <motion.button
                                        whileHover={reduceMotion ? undefined : { scale: 1.04, borderColor: 'rgba(66, 251, 60, 0.6)', backgroundColor: 'rgba(66, 251, 60, 0.1)' }}
                                        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                                        onClick={() => openWhatsApp(t('home.whatsapp.message'))}
                                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#c1cbd3] bg-white/5 text-app-text-h1 text-sm font-semibold cursor-pointer transition-colors w-full sm:w-auto"
                                    >
                                        <MessageCircle className="w-4 h-4 text-[#48bb78]" />
                                        {t('home.hero.startProject')}
                                    </motion.button>
                                </motion.div>

                                <motion.div variants={heroItem} className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
                                    {heroHighlights.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={reduceMotion ? false : { opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: reduceMotion ? 0 : 0.55 + index * 0.1, duration: 0.5 }}
                                                whileHover={reduceMotion ? undefined : { x: dir === 'rtl' ? -6 : 6, borderColor: 'rgba(255,255,255,0.2)' }}
                                                className="flex items-center gap-3 px-2 sm:px-1 py-1.5 sm:py-1 rounded-xl border border-white/10 bg-white/[0.04] transition-colors"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-[color-mix(in_oklab,lab(56_-45.31_16.82)_15%,transparent)] flex items-center justify-center shrink-0">
                                                    <Icon className="w-4 h-4 text-[lab(56_-45.31_16.82)]" />
                                                </div>
                                                <span className="text-xs sm:text-sm text-gray-400">{item.text}</span>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Decorative background — scoped to page, not fixed over footer */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden>
                    <div
                        className="absolute top-0 end-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-cyan-500 rounded-full opacity-[0.06] blur-3xl"
                        style={reduceMotion ? undefined : { animation: 'float-glow 6s ease-in-out infinite' }}
                    />
                    <div
                        className="hidden sm:block absolute bottom-24 start-0 w-48 md:w-72 h-48 md:h-72 bg-blue-500 rounded-full opacity-[0.05] blur-3xl"
                        style={reduceMotion ? undefined : { animation: 'float-glow 8s ease-in-out infinite 1s' }}
                    />
                    <svg className="absolute inset-0 w-full h-full opacity-[0.08] sm:opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                                <circle cx="16" cy="16" r="1.5" fill="rgba(34, 211, 238, 0.5)" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dots)" />
                    </svg>
                </div>

                <div className="relative z-10">
                    <div className="min-h-full pb-8 ">
                        {/* Services */}
                        <motion.section
                            id="services"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={servicesListVariant}
                            className="px-4 sm:px-6 mb-8 max-w-7xl mx-auto py-4"
                        >
                            <motion.div variants={scrollRevealVariant} className="mb-4 sm:mb-6">
                                <h2 className="text-[2rem] sm:text-[2rem] font-bold text-app-text-h1">{t('home.servicesTitle')}</h2>
                                <p className="dash-muted text-sm sm:text-[#009966] mt-1">{t('services.subtitle')}</p>
                            </motion.div>

                            <div className="space-y-3 sm:space-y-4">
                                {services.map((service) => {
                                    const Icon = service.icon;
                                    const isExpanded = selectedService === service.id;

                                    return (
                                        <motion.div
                                            key={service.id}
                                            variants={serviceCardVariant}
                                            className={`group overflow-hidden rounded-2xl ${cardClass} ${isExpanded ? 'border-[#009966]/60' : 'border-white/10'} transition-colors duration-300`}
                                        >
                                            <motion.div
                                                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                                                onClick={() => setSelectedService(isExpanded ? null : service.id)}
                                                className="relative p-5 sm:p-8 cursor-pointer"
                                            >
                                                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#10ad4248] via-[#72d57204] to-transparent" />
                                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                                    <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                                                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#10ad43] to-[#428658] shadow-[0_10px_28px_rgba(16,173,67,0.28)] shrink-0">
                                                            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#72d572]">Frontend service</p>
                                                            <h3 className="text-xl sm:text-2xl font-bold text-app-text-h1">{service.title}</h3>
                                                            <p className="mt-1 text-xs sm:text-sm text-[#009966]">{service.subtitle}</p>
                                                        </div>
                                                    </div>

                                                    <motion.div
                                                        animate={{ rotate: isExpanded ? 90 : 0 }}
                                                        transition={{ duration: reduceMotion ? 0 : 0.25 }}
                                                        className="self-end lg:self-start rounded-full border border-[#72d572]/30 p-2"
                                                    >
                                                        <ArrowRight className="w-5 h-5 text-[#72d572] rtl:rotate-180" />
                                                    </motion.div>
                                                </div>

                                                <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                                                    <p className="dash-muted max-w-2xl text-sm leading-7">{service.description}</p>
                                                    <div className="flex flex-wrap gap-2 lg:justify-end">
                                                        {service.technologies.map((tech) => (
                                                            <span key={tech} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-app-text-muted">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>

                                            <AnimatePresence initial={false}>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                                                        transition={{ duration: reduceMotion ? 0 : 0.25 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-5 sm:space-y-6">
                                                            <div>
                                                                <h4 className="text-sm font-semibold mb-3">{t('services.features')}</h4>
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                                                                    {service.features.map((feature, i) => (
                                                                        <div key={i} className="flex items-start gap-2">
                                                                            <Check className="w-4 h-4 text-[#009966] mt-0.5 shrink-0" />
                                                                            <span className="text-xs sm:text-sm text-app-text">{feature}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <h4 className="text-sm font-semibold mb-3">{t('services.technologies')}</h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {service.technologies.map((tech, i) => (
                                                                        <span
                                                                            key={i}
                                                                            className="px-3 py-1 rounded-lg text-xs text-[#009966] bg-[#00996612] border border-[#00d4ff33]"
                                                                        >
                                                                            {tech}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.section>

                        {/* About & Experience */}
                        <section className="text-gray-300 py-10 sm:py-14 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto font-sans">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-60px' }}
                                    variants={scrollRevealVariant}
                                    className="lg:col-span-7 bg-[#dde5fa05] border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 relative overflow-hidden shadow-2xl before:absolute before:top-0 before:start-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#009966]/40 before:to-transparent"
                                >
                                    <div className="absolute -bottom-20 -start-20 w-60 h-60 bg-[#009966]/5 blur-[100px] rounded-full pointer-events-none" />

                                    <div className="flex items-center gap-3 mb-5 sm:mb-6">
                                        <div className="p-2 bg-[#039a67]/24 border border-white/5 rounded-xl text-[#039a67]">
                                            <User size={22} />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-app-text-h1 tracking-tight">{t('about.title')}</h2>
                                    </div>

                                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-400 leading-snug mb-3 sm:mb-4">
                                        {t('home.hero.cardTitle')}
                                    </h3>

                                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-5 sm:mb-6">
                                        {t('home.hero.bio')}
                                    </p>

                                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 sm:mb-8 border-s-2 color-mix(in oklab,rgba(79, 145, 99, 0.68) 15%, transparent) ps-4 italic">
                                        &ldquo;{t('about.quote')}&rdquo;
                                    </p>

                                    <div className="border color-mix(in oklab,rgba(80, 154, 102, 0.68) 15%, transparent) rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6">
                                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                            <div className="w-2 h-2 rounded-full bg-[#039a67]" />
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">{t('about.whatIDo')}</h4>
                                        </div>
                                        <ul className="space-y-2.5 sm:space-y-3 text-sm md:text-base">
                                            <li className="flex items-start gap-2.5">
                                                <span className="text-[#039a67] mt-1">✓</span>
                                                <span className="text-neutral-400">{t('home.hero.feature2')}</span>
                                            </li>
                                            <li className="flex items-start gap-2.5">
                                                <span className="text-[#039a67] mt-1">✓</span>
                                                <span className="text-neutral-400">{t('home.hero.feature3')}</span>
                                            </li>
                                            <li className="flex items-start gap-2.5">
                                                <span className="text-[#039a67] mt-1">✓</span>
                                                <span className="text-neutral-400">{t('home.hero.cardDesc')}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="border color-mix(in oklab,rgba(53, 73, 59, 0.68) 15%, transparent) rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 ">
                                        <div className="p-2 text-[#039a67]  rounded-lg text-[#039a67] shrink-0">
                                            <Sparkles size={18} />
                                        </div>
                                        <div>
                                            <span className="text-[16px] font-bold text-gray-500 tracking-widest uppercase block mb-0.5">
                                                {t('home.about.highlight')}
                                            </span>
                                            <p className="text-xs md:text-sm text-neutral-400 font-medium">{t('home.hero.feature1')}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-60px' }}
                                    variants={scrollRevealVariant}
                                    className="lg:col-span-5 border border-white/5 color-mix(in oklab,rgba(80, 154, 102, 0.68) 15%, transparent) rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 relative overflow-hidden shadow-2xl before:absolute before:top-0 before:start-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#039a67]/40 before:to-transparent bg-[#dde5fa05]"
                                >
                                    <div className="absolute -top-20 -end-20 w-60 h-60 bg-[#039a67]/5 blur-[100px] rounded-full pointer-events-none" />

                                    <div className="flex items-center gap-3 mb-6 sm:mb-8">
                                        <div className="p-2 bg-[#039a67]/24 border border-white/5 rounded-xl text-[#039a67]">
                                            <Briefcase size={22} />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-app-text-h1 tracking-tight">{t('experience.title')}</h2>
                                    </div>

                                    <div className="space-y-5 sm:space-y-6 relative border-s color-mix(in oklab,rgba(79, 145, 99, 0.68) 15%, transparent) ps-2 ms-4">
                                        {experiences.map((exp, index) => (
                                            <div key={index} className="relative ps-5 sm:ps-6 group">
                                                <div className="absolute -start-[13px] top-1.5 w-6 h-6 rounded-full bg-[#039a67]/24 border border-white/10 flex items-center justify-center text-neutral-500 group-hover:border-[#00d4ff] group-hover:text-[#00d4ff] transition-colors duration-300">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#039a67]" />
                                                </div>

                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-1">
                                                    <h4 className="text-sm sm:text-base font-semibold text-gray-400 group-hover:text-[#009966] transition-colors duration-300">
                                                        {exp.company}
                                                    </h4>
                                                    <span className="self-start text-[10px] sm:text-[11px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5 whitespace-nowrap">
                                                        {exp.duration}
                                                    </span>
                                                </div>

                                                <p className="text-xs md:text-sm text-neutral-400 font-medium">{exp.role}</p>

                                                {index !== experiences.length - 1 && (
                                                    <hr className="border-white/5 mt-4 sm:mt-5" />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 sm:mt-10 pt-4">
                                        <motion.button
                                            whileHover={reduceMotion ? undefined : { x: dir === 'rtl' ? -4 : 4 }}
                                            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                                            onClick={() => openWhatsApp(t('home.whatsapp.message'))}
                                            className="w-full py-3 px-4 rounded-xl bg-[#039a67]/24 hover:bg-[#039a67]/32 border border-white/10 hover:border-[#00996612]/40 text-sm font-medium text-white flex items-center justify-center gap-2 transition-all duration-300 group"
                                        >
                                            <span>{t('home.cta.button')}</span>
                                            <ChevronRight size={16} className="text-[#009966] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </div>
                        </section>

                        {/* Toolkit */}
                        <motion.section
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={scrollRevealVariant}
                            className="px-4 sm:px-6 mb-10 sm:mb-12 max-w-7xl mx-auto"
                        >
                            <div className="dash-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border-[3px] color-mix(in oklab,rgba(80, 154, 102, 0.68) 15%, transparent) backdrop-blur-md">
                                <h2 className="text-[2rem] sm:text-[2rem] font-bold text-app-text-h1 mb-1.5 sm:mb-2">{t('home.toolkit.title')}</h2>
                                <p className="text-xs sm:text-sm text-neutral-400 mb-4 sm:mb-6">{t('home.toolkit.subtitle')}</p>

                                <div className="grid gap-5 sm:gap-6">
                                    {Object.entries(TOOLKIT).map(([category, tools]) => (
                                        <div key={category}>
                                            <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#72d572]">
                                                {t(`home.toolkit.${category}`)}
                                            </h3>
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {tools.map((tool) => (
                                                    <motion.span
                                                        key={tool}
                                                        whileHover={reduceMotion ? undefined : { scale: 1.05, borderColor: '#009966', backgroundColor: 'rgba(255,255,255,0.05)' }}
                                                        className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#009966]/10 bg-white/[0.02] text-[11px] sm:text-xs text-neutral-400 font-medium transition-colors cursor-default"
                                                    >
                                                        {tool}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>

                        {/* Contact */}
                        <motion.section
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={scrollRevealVariant}
                            className="px-4 sm:px-6  max-w-7xl mx-auto py-2"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                                <div className="lg:col-span-7 dash-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/10 backdrop-blur-md bg-white/[0.02] flex flex-col justify-between min-h-[240px] sm:min-h-[280px]">
                                    <div>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-neutral-400 uppercase tracking-widest mb-4 sm:mb-6">
                                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-pulse" />
                                            {t('home.contact.badge')}
                                        </span>
                                        <h2 className="text-[2rem] sm:text-[2rem] font-bold text-app-text-h1 tracking-tight mb-2">
                                            {t('home.contact.title')}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-neutral-400">{t('home.contact.subtitle')}</p>
                                    </div>

                                    <div className="mt-6 sm:mt-8">
                                        <motion.a
                                            href="https://myaccount.google.com/?hl=ar&utm_source=OGB&utm_medium=act&gar=WzEyMF0"
                                            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                                            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                                            className="inline-flex items-center justify-between gap-3 sm:gap-4 p-1.5 pe-3 sm:pe-4 rounded-full bg-[#039a67] text-black hover:bg-[#039a67]/24 transition-colors cursor-pointer w-full sm:w-auto"
                                        >
                                            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#039a67]/24 flex items-center justify-center text-black shrink-0">
                                                    <MessageCircle className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="flex flex-col text-start min-w-0">
                                                    <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-200 leading-none mb-0.5">
                                                        {t('home.contact.emailLabel')}
                                                    </span>
                                                    <span className="text-white sm:text-sm font-semibold leading-none truncate">salma88tar@gmail.com
                                                    </span>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-white transform -rotate-45 rtl:rotate-45 shrink-0" />
                                        </motion.a>
                                        <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-2.5 sm:mt-3 ps-2">
                                            {t('home.contact.note')}
                                        </p>
                                    </div>
                                </div>

                                <div className="lg:col-span-5 dash-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-gray/10 backdrop-blur-md bg-white/[0.02] flex flex-col justify-center min-h-[240px] sm:min-h-[280px]">
                                    <div className="space-y-2.5 sm:space-y-3">
                                        <p className="text-[20px] font-bold text-app-text-h1 tracking-widest block mb-3 sm:mb-4">
                                            {t('home.social.title')}
                                        </p>

                                        <motion.a
                                            href={GITHUB_PROFILE_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={reduceMotion ? undefined : { borderColor: 'rgba(255,255,255,0.2)', x: dir === 'rtl' ? -4 : 4 }}
                                            className="flex items-center justify-between px-2 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
                                        >
                                            <span className="text-sm font-medium text-app-text-h2 group-hover:text-gray-500 transition-colors">GitHub</span>
                                            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transform -rotate-45 rtl:rotate-45 transition-all" />
                                        </motion.a>

                                        <motion.a
                                            href="https://linkedin.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={reduceMotion ? undefined : { borderColor: 'rgba(255,255,255,0.2)', x: dir === 'rtl' ? -4 : 4 }}
                                            className="flex items-center justify-between  px-2 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
                                        >
                                            <span className="text-sm font-medium text-app-text-h2 group-hover:text-gray-500 transition-colors">LinkedIn</span>
                                            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transform -rotate-45 rtl:rotate-45 transition-all" />
                                        </motion.a>
                                    </div>

                                    <div className="border-t border-white/5 p-2 sm:p-3 mt-4 sm:mt-6 space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2 text-xs">
                                            <span className="text-app-text-p">{t('home.social.replyTime')}</span>
                                            <span className="text-neutral-400 font-medium">{t('home.social.replyValue')}</span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2 text-xs">
                                            <span className="text-app-text-p">{t('home.social.bestFor')}</span>
                                            <span className="text-neutral-400 font-medium text-start sm:text-end">{t('home.social.bestForValue')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Footer */}
                        <footer className="relative z-20 w-full border-t border-white/10 bg-app-bg py-8 px-4 sm:px-6">
                            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 text-center md:text-start">
                                <div className="flex flex-col gap-2 order-3 md:order-1">
                                    <p className="text-xs sm:text-sm text-neutral-400 font-medium">{t('footer.rights')}</p>
                                    <p className="text-[11px] sm:text-xs text-neutral-300 px-3">{t('footer.crafted')}</p>
                                </div>

                                <div className="flex flex-col items-center gap-3 sm:gap-4 order-1 md:order-2">
                                    <h3 className="text-[16px] font-semibold text-gray-500  tracking-wide">{t('footer.linksTitle')}</h3>
                                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-x-8 sm:gap-y-3 text-xs sm:text-sm text-neutral-400">
                                        <Link href="/dashboard/home#home" className="hover:text-white transition-colors py-1">{t('footer.home')}</Link>
                                        <Link href="/dashboard/Portfolio" className="hover:text-white transition-colors py-1">{t('footer.projects')}</Link>
                                        <Link href="/dashboard/home#services" className="hover:text-white transition-colors py-1">{t('footer.services')}</Link>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 order-2 md:order-3">
                                    <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="GitHub">
                                        <GitHubIcon className="w-4 h-4" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/salma-tarek-253a9b403/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="LinkedIn">
                                        <LinkedInIcon className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
