'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Card, Chain } from '../types'

interface AddCardModalProps {
  onAdd: (card: Omit<Card, 'id' | 'balance' | 'lastActivity'>) => void
  onClose: () => void
}

export default function AddCardModal({ onAdd, onClose }: AddCardModalProps) {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [chain, setChain] = useState<Chain>('Ethereum')
  const [type, setType] = useState<'moonwell' | 'default'>('default')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({ name, address, chain, type })
    onClose()
  }

  const chains: Chain[] = ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism']

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        
        <h2 className="text-xl font-bold mb-4">Add New Card</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Card Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Main Spending Card"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-500 mb-1">Wallet Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0x..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-500 mb-1">Chain</label>
            <select
              value={chain}
              onChange={(e) => setChain(e.target.value as Chain)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {chains.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Card Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'moonwell' | 'default')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Default</option>
              <option value="moonwell">Moonwell</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800 transition-colors"
          >
            Add Card
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
} 