"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Globe, Server } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useMotionPrefs } from '@/app/lib/motion';

const projects = [
  {
    id: 12,
    title: 'EcoGlow',
    category: 'Web',
    icon: Globe,
    description: 'A clean beauty marketing platform for skincare businesses, with a polished responsive interface and customer and expert portal flows.',
    image: '/ecoglow-preview.png',
    link: 'https://eco-glow-jht2.vercel.app/',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    stats: { type: 'Web', framework: 'Next.js', focus: 'Skincare marketing' },
    gradient: 'from-[#10ad43] to-[#428658]',
  },
  {
    id: 13,
    title: 'Liceria',
    category: 'Web',
    icon: Globe,
    description: 'A React-based web platform with a focused Arabic login experience, responsive form design, and a warm visual identity.',
    image: '/liceria-preview.png',
    link: 'https://liceria-nine.vercel.app/login',
    technologies: ['React', 'JavaScript', 'CSS', 'Responsive UI'],
    stats: { type: 'Web', framework: 'React', focus: 'Arabic interface' },
    gradient: 'from-[#10ad43] to-[#428658]',
  },
  {
    id: 14,
    title: 'EduPrime',
    category: 'Web',
    icon: Globe,
    description: 'A complete learning-center platform that connects students with teachers and learning centers through search, learning paths, and AI-powered education experiences.',
    image: '/eduprime-preview.png',
    link: 'https://edu-prime-six.vercel.app/',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    stats: { type: 'Web', framework: 'Next.js', focus: 'Education platform' },
    gradient: 'from-[#10ad43] to-[#428658]',
  },
  {
    id: 1,
    title: 'ABC mouse',
    category: 'Web',
    icon: Globe,
    description: 'A colorful and playful website created for kids, offering an easy and enjoyable experience with interactive elements and friendly design.',
    image: '/Screenshot 2026-04-25 200506.png',
    link: 'https://abc-mouse-zwo9-qtd70boj6-salmas-projects-1976d6cf.vercel.app/',
    technologies: ['Next.js', 'tailwindcss'],
    stats: { users: '50K+', rating: '4.8', downloads: '100K+' },
    gradient: 'from-[#10ad43] to-[#428658]',
  },
  {
    id: 2,
    title: 'Skin Stack',
    category: 'Web',
    icon: Globe,
    description: 'Skin Stack is a smart skincare platform that generates personalized daily routines and recommendations using external APIs, helping users maintain healthy and consistent skin care habits.',
    image: '/Screenshot 2026-04-25 202228.png',
    link: 'https://skinstack-ui77-hibdb5pwd-salmas-projects-1976d6cf.vercel.app/',
    technologies: ['Next.js', 'fakeapi', 'tailwindcss'],
    stats: { users: '30K+', rating: '4.9', orders: '250K+' },
    gradient: 'from-[#10ad43] to-[#428658]',
  },
  {
    id: 3,
    title: 'Travel.',
    category: 'Web',
    icon: Globe,
    description: 'An interactive travel booking interface that allows users to customize their trip by selecting travelers, room types, and duration with real-time price calculation and discount handling.',
    image: '/Screenshot 2026-04-25 203942.png',
    link: 'https://travel-1-pxcq-pg31jru33-salmas-projects-1976d6cf.vercel.app/',
    technologies: ['React', 'API Integration', 'JavaScript', 'UI/UX Design'],
    stats: { users: '20K+', rating: '4.7', hospitals: '150+' },
    gradient: 'from-[#10ad43] to-[#428658]',
  },
  {
    id: 4,
    title: 'Candid Rabanadas',
    category: 'Backend',
    icon: Server,
    description: 'Scalable microservices architecture handling millions of requests per day.',
    image: '/Screenshot 2026-04-25 205511.png',
    link: 'https://candid-rabanadas-59cc5f.netlify.app/',
    technologies: ['Node.js', 'Tailwind CSS', 'JavaScript', 'Node.js'],
    stats: { uptime: '99.9%', requests: '5M/day', latency: '<50ms' },
    gradient: 'from-[#10ad43] to-[#428658]',
  },
  {
    id: 5,
    title: 'Farmart Eosin',
    category: 'Backend',
    icon: Server,
    description: 'AI-powered fitness companion with personalized workout plans and nutrition tracking.',
    image: '/Screenshot 2026-04-25 205638.png',
    link: 'https://farmart-eosin.vercel.app/#/',
    technologies: ['Node.js', 'Tailwind CSS', 'JavaScript', 'Node.js'],
    stats: { users: '75K+', rating: '4.9', workouts: '1M+' },
    gradient: 'from-[#10ad43] to-[#428658]',
  },
  {
    id: 6,
    title: 'E-learn',
    category: 'Backend',
    icon: Server,
    description: 'A full-stack e-learning platform with secure authentication, course management, progress tracking, and a modern responsive interface for students and administrators.',
    image: '/Screenshot 2026-04-25 210007.png',
    link: 'https://e-learn-platform-five.vercel.app/',
    technologies: ['Node.js', 'Tailwind CSS', 'JavaScript', 'Next.js'],
    stats: { uptime: '99.95%', users: '100K+', messages: '10M/day' },
    gradient: 'from-[#10ad43] to-[#428658]',
  },
  {
    id: 7,
    title: 'Amazing Torte',
    category: 'Backend',
    icon: Server,
    description: 'A modern business services website featuring responsive design, service showcases, smooth navigation, and a clean interface to present business solutions professionally.',
    image: '/Screenshot 2026-04-25 210252.png',
    link: 'https://amazing-torte-ef2cad.netlify.app/',
    technologies: ['React.js', 'Tailwind CSS', 'JavaScript'],
    stats: { uptime: '99.95%', users: '100K+', messages: '10M/day' },
    gradient: 'from-[#10ad43] to-[#428658]',
  },
  {
    id: 8,
    title: 'Cosmic Longma',
    category: 'Backend',
    icon: Server,
    description: 'High-performance API serving a social platform with real-time messaging.',
    image: '/Screenshot 2026-04-25 211302.png',
    link: 'https://cosmic-longma-458e84.netlify.app/',
    technologies: ['Node.js', 'WebSocket', 'PostgreSQL'],
    stats: { uptime: '99.95%', users: '100K+', messages: '10M/day' },
    gradient: 'from-[#10ad43] to-[#428658]',
  },
  {
    id: 9,
    title: 'Movieo app',
    category: 'Backend',
    icon: Server,
    description: 'High-performance API serving a social platform with real-time messaging.',
    image: '/Screenshot 2026-04-25 210949.png',
    link: 'https://movieoapp-lilac.vercel.app/',
    technologies: ['Node.js', 'WebSocket', 'PostgreSQL'],
    stats: { uptime: '99.95%', users: '100K+', messages: '10M/day' },
    gradient: 'from-[#10ad43] to-[#428658]',
  },
  {
    id: 10,
    title: 'ALODAH',
    category: 'Web',
    icon: Globe,
    description: 'A modern platform for preserving tribal heritage and genealogy, featuring historical archives, notable figures, poetry collections, photo galleries, and an interactive family tree within a fully responsive Arabic interface.',
    image: '/neonbites-profile.jpeg',
    link: 'https://www.alodah.net/',
    technologies: ['React.js', 'Tailwind CSS', 'JavaScript'],
    stats: { uptime: '99.95%', users: '10K+', orders: '5K+' },
    gradient: 'from-[#10ad43] to-[#428658]',
  },
  {
    id: 11,
    title: 'Neonbites',
    category: 'Web',
    icon: Globe,
    description: 'A modern and visually engaging restaurant website designed to deliver an immersive food ordering experience. The platform features interactive menus, smooth animations, responsive layouts, and a stylish UI that highlights featured meals and promotions while ensuring seamless navigation across all devices.',
    image: '/Screenshot 2026-05-15 153220.png',
    link: 'https://neonbites.vercel.app/',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'JavaScript'],
    stats: { users: '50K+', rating: '4.8', downloads: '100K+' },
    gradient: 'from-[#10ad43] to-[#428658]',
  },
];

const categories = [
  { key: 'All', labelKey: 'portfolio.category.all' as const },
  { key: 'Web', labelKey: 'portfolio.category.web' as const },
  { key: 'Backend', labelKey: 'portfolio.category.backend' as const },
];

export default function PortfolioScreen() {
  const { t } = useLanguage();
  const { reduceMotion } = useMotionPrefs();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="dash-page pb-8">
      {/* Header */}
      <section className="page-px pt-8 sm:pt-10 pb-4 sm:pb-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
        >
          <h1 className="text-3xl sm:text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-[#009966] to-[#96bda1] bg-clip-text text-transparent">
              {t('portfolio.title')}
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            {t('portfolio.subtitle')}
          </p>
        </motion.div>
      </section>

      <section className="page-px mb-6 sm:mb-8">
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((category) => (
            <motion.button
              key={category.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-6 py-2 rounded-full whitespace-nowrap border transition-all duration-300 ${selectedCategory === category.key
                ? 'bg-gradient-to-r from-[#009966] to-[#96bda1] border-transparent text-white shadow-lg shadow-blue-500/20'
                : ' border-[#009966]-400/20 text-gray-400 hover:border-[#009966]-400/40'
                }`}
            >
              {t(category.labelKey)}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="page-px pb-8">
        <motion.div layout={!reduceMotion} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: reduceMotion ? 0 : index * 0.03 }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  onClick={() => setSelectedProject(project)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer bg-[lab(68 1.89 -11.7 / 0.15)] border border-green-400/20 group backdrop-blur-md"
                >
                  <div className="relative h-44 sm:h-52 md:h-56 overflow-hidden bg-gradient-to-br from-[#1a1f3a] to-[#0a0e27]">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#] via-transparent to-transparent" />
                    <div className="absolute top-3 sm:top-4 end-3 sm:end-4 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-green-500/20 border border-green-400/30 backdrop-blur-xl text-white">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-gradient-to-r  ${project.gradient} shadow-lg shadow-green-500/20 shrink-0`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-xl font-bold text-app-text-h2 mb-1 group-hover:text-[10ad43] transition-colors">{project.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">{project.description}</p>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg text-xs font-medium bg-[#10ad43]/10 border border-[#10ad43]/20 text-[#10ad43]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 16 }}
                className="w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl dash-card shadow-2xl pointer-events-auto no-scrollbar"
              >
                <div className="relative h-48 sm:h-64 md:h-72 bg-gradient-to-br from-[#1a1f3a] to-[#0a0e27]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] to-transparent" />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-3 sm:top-4 end-3 sm:end-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-5 sm:p-8">
                  <h2 className="text-xl sm:text-3xl text-app-text-h2 font-bold mb-3 sm:mb-4">{selectedProject.title}</h2>
                  <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-lg">{selectedProject.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="p-4 rounded-2xl bg-green-500/5 border border-green-400/10 text-center">
                        <div className="text-xl font-bold text-[#10ad43]">{value}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3 sm:mb-4">{t('portfolio.techStack')}</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.technologies.map((tech, i) => (
                        <span key={i} className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-400/20 text-[#10ad43] font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => selectedProject.link && window.open(selectedProject.link, '_blank')}
                      className="w-full sm:flex-1 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#428658] to-[#5fd184b8] text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                      <ExternalLink size={20} />
                      {t('portfolio.livePreview')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}