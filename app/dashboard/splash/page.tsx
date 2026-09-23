"use client"; // ضروري لأن المكون يعتمد على التفاعل والأنيميشن

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // التغيير هنا: استخدم navigation وليس router
import { motion } from 'framer-motion'; // تأكد من تثبيت framer-motion
import { Code2, Cpu } from 'lucide-react';

const PARTICLES = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  duration: 2 + (index % 4) * 0.5,
  delay: (index % 5) * 0.4,
}));

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding'); // التغيير هنا: استخدام push بدلاً من navigate
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #050810 100%)' }}>

      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {PARTICLES.map((particle) => (
          <div
            key={particle.id}
            className="absolute"
            style={{
              left: particle.left,
              top: particle.top,
            }}
          >
            <motion.div
              className="w-1 h-1 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#00ffff]"
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          </div>
        ))}
      </div>

      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300d4ff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Logo and Brand */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8"
        >
          {/* Glowing Circle Background */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-br from-[#00d4ff] to-[#0066ff]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Logo Container */}
          <div className="relative w-32 h-32 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(26, 31, 58, 0.6)',
              border: '2px solid rgba(0, 212, 255, 0.3)',
              backdropFilter: 'blur(10px)',
            }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-16 h-16 text-[#00d4ff]" />
            </motion.div>
            <Code2 className="absolute w-8 h-8 text-[#00ffff]" />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-2 tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #00ffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(0, 212, 255, 0.5)',
            }}>
            CODEX
          </h1>
          <motion.p
            className="text-[#00d4ff] text-sm tracking-widest"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            DIGITAL SOLUTIONS
          </motion.p>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#00d4ff]"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}