'use client';

import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

interface HeroSectionProps {
  onSearch?: (filters: { country: string; degreeLevel: string }) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Find Your Dream University
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Connect with top universities worldwide. Compare programs, check eligibility, and apply in minutes.
          </p>
        </motion.div>

        {/* Animated Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <SearchBar onSearch={onSearch} />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <div className="text-4xl font-bold text-blue-200">100+</div>
            <div className="text-blue-100 mt-2">Universities</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-200">50+</div>
            <div className="text-blue-100 mt-2">Countries</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-200">10,000+</div>
            <div className="text-blue-100 mt-2">Students Placed</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
