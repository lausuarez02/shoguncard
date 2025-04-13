'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon, ArrowLeftIcon, SparklesIcon, WalletIcon, CreditCardIcon, ChartBarIcon, DocumentIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

// Animation variants for sections
const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const slides = [
  {
    id: 'hero',
    content: (
      <div className="text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white">
          ShogunCard
          <span className="block text-2xl md:text-3xl mt-4 text-blue-400 font-light">
            AI-Powered Treasury for Your Crypto Cards
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Earn yield. Stay liquid. Spend instantly.
        </p>
      </div>
    )
  },
  {
    id: 'problem',
    content: (
      <div className="space-y-12">
        <h2 className="text-4xl font-bold text-white text-center">
          Managing crypto card liquidity sucks.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white/5 rounded-2xl backdrop-blur">
            <CreditCardIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 text-center">Manual fund transfers</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl backdrop-blur">
            <WalletIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 text-center">Idle funds don't earn</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl backdrop-blur">
            <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 text-center">Poor user experience</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'solution',
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Enter ShogunCard</h2>
        <div className="aspect-[1.586/1] max-w-lg mx-auto flex flex-col justify-between p-6 rounded-2xl shadow-xl relative overflow-hidden bg-[#1E3A8A]">
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 bg-blue-400/20 rounded-full -top-24 -right-24" />
            <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full -bottom-24 -left-24" />
          </div>
          <div className="relative">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-2xl font-light text-white">Moonwell × CYPHER</span>
                <span className="text-xs mt-1 text-blue-200">Smart Treasury Card</span>
              </div>
              <img src="/visa02.png" alt="Visa" className="h-6 brightness-200" />
            </div>
          </div>
          <div className="relative">
            <p className="font-mono text-lg text-white/80">•••• 5678</p>
            <div className="mt-2">
              <p className="text-xs text-blue-200">Balance</p>
              <p className="text-xl font-bold text-white">$1234.56</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'how-it-works',
    content: (
      <div className="space-y-12">
        <h2 className="text-4xl font-bold text-white text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white/5 rounded-2xl backdrop-blur">
            <div className="text-5xl font-bold text-blue-500 mb-4">01</div>
            <h3 className="text-xl font-semibold text-white mb-2">Add Your Cards</h3>
            <p className="text-gray-300">Connect any crypto card with its wallet address</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl backdrop-blur">
            <div className="text-5xl font-bold text-purple-500 mb-4">02</div>
            <h3 className="text-xl font-semibold text-white mb-2">Deposit Crypto</h3>
            <p className="text-gray-300">Fund your vault once and earn yield</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl backdrop-blur">
            <div className="text-5xl font-bold text-green-500 mb-4">03</div>
            <h3 className="text-xl font-semibold text-white mb-2">Let AI Handle It</h3>
            <p className="text-gray-300">Smart treasury manages your liquidity</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'ai-treasury',
    content: (
      <div className="space-y-12">
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          An AI That Understands You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="p-6 bg-white/5 rounded-2xl backdrop-blur">
            <h3 className="text-xl font-semibold text-white mb-4">Learning Engine</h3>
            <p className="text-gray-300">
              Analyzes spending patterns to predict liquidity needs
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl backdrop-blur">
            <h3 className="text-xl font-semibold text-white mb-4">Yield Optimizer</h3>
            <p className="text-gray-300">
              Maximizes returns on idle funds while maintaining liquidity
            </p>
          </div>
        </div>
      </div>
    )
  }
]

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-blue-900 flex items-center justify-center relative">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -top-48 -right-48 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl -bottom-48 -left-48 animate-pulse delay-1000" />
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="fixed left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur z-20"
        disabled={currentSlide === 0}
      >
        <ArrowLeftIcon className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="fixed right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur z-20"
      >
        <ArrowRightIcon className="h-6 w-6 text-white" />
      </button>

      {/* Slide content */}
      <div className="container mx-auto px-6 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold text-white mb-8"
            >
              Ready to try ShogunCard?
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="flex justify-center gap-4"
            >
              <Link 
                href="/demo"
                className="px-8 py-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                Try ShogunCard <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 