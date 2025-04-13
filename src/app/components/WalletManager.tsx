'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useAccount, useBalance, useWriteContract, useTransaction } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseUnits } from 'viem'

// USDC contract address on mainnet
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'

interface WalletManagerProps {
  onTopUp: (amount: number) => void
}

export default function WalletManager({ onTopUp }: WalletManagerProps) {
  const [amount, setAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const { address, isConnected } = useAccount()
  
  const { data: balance } = useBalance({
    address,
    token: USDC_ADDRESS
  })

  const [txHash, setTxHash] = useState<`0x${string}` | undefined>()
  const { writeContract } = useWriteContract()
  const { isLoading: isTopUpLoading, data: topUpData } = useTransaction({
    hash: txHash,
  })

  const handleTopUp = async () => {
    if (!amount || !address) return
    setIsProcessing(true)
    try {
      const numAmount = parseFloat(amount)
      const value = parseUnits(amount, 6)
      
      const hash = await writeContract({
        address: USDC_ADDRESS,
        abi: [], // Add your ABI
        functionName: 'transfer',
        args: [address, value],
      })
      
      setTxHash(hash)
      onTopUp(numAmount)
    } catch (error) {
      console.error('Top up failed:', error)
    } finally {
      setIsProcessing(false)
      setAmount('')
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-black mb-4">Wallet Management</h2>
      
      {!isConnected ? (
        <div className="flex justify-center">
          <ConnectButton />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-500">Connected Wallet</span>
            <span className="text-sm font-mono">
              {balance?.formatted} {balance?.symbol}
            </span>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm text-gray-500">Amount to Top Up (USDC)</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleTopUp}
                disabled={isProcessing || !amount || isTopUpLoading}
                className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing || isTopUpLoading ? (
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                ) : (
                  'Top Up'
                )}
              </motion.button>
            </div>
          </div>

          {topUpData?.hash && (
            <div className="border border-green-100 bg-green-50 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Transaction submitted
                  </p>
                  <a 
                    href={`https://etherscan.io/tx/${topUpData.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-600 hover:underline mt-1"
                  >
                    View on Etherscan
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 