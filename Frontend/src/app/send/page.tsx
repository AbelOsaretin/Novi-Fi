"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, X, ChevronUp, ChevronDown, CreditCard, Sliders } from "lucide-react"
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"


export default function SendPage() {
  const router = useRouter()
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [usdAmount, setUsdAmount] = useState("0.00")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isUsdMode, setIsUsdMode] = useState(false)

  // Mock exchange rate
  const ethToUsd = 1566.87

  useEffect(() => {
    if (amount) {
      const usdValue = Number.parseFloat(amount) * ethToUsd
      setUsdAmount(usdValue.toFixed(2))
    } else {
      setUsdAmount("0.00")
    }
  }, [amount])

  const handleAddressChange = (value: string) => {
    setAddress(value)
  }

  const handleAmountChange = (value: string) => {
    // Only allow numbers and a single decimal point
    const regex = /^(\d*\.?\d*)$/
    if (value === "" || regex.test(value)) {
      setAmount(value)
    }
  }

  const handleReview = () => {
    if (address && amount) {
      setShowConfirmation(true)
    }
  }

  const handleConfirm = () => {
    setShowConfirmation(false)
    router.push("/dashboard/?status=sending")

    // Simulate transaction completion after 3 seconds
    setTimeout(() => {
      router.push("/dashboard/?status=sent")
    }, 3000)
  }

  const handleBack = () => {
    router.push("/")
  }

  const toggleUnitDisplay = () => {
    setIsUsdMode(!isUsdMode)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[url('/assets/app-background.png')] bg-cover bg-center bg-no-repeat font-(family-name:--font-ibm-plex)">
      {/* Header */}
      <header className="p-4 flex items-center">
        <button onClick={handleBack} className="text-blue-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-medium text-center flex-1">Send</h1>
        <div className="w-6"></div> {/* Spacer for alignment */}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col">
        {/* Address Input */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <span className="text-gray-500">To:</span>
            <div className="flex-1 ml-2 relative">
              <input
                type="text"
                placeholder="Name, ENS, or address"
                className="w-full border-none outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                value={address}
                onChange={(e) => handleAddressChange(e.target.value)}
                autoFocus
              />
              {address && (
                <button className="absolute right-0 text-gray-400" onClick={() => setAddress("")}>
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              className="text-gray-500 bg-gray-200 px-3 py-1 rounded-md text-sm"
              onClick={() => {
                // Mock paste functionality - in a real app, this would use clipboard API
                handleAddressChange("0xFaa32BA7A25460Bca971730B51058a893E")
              }}
            >
              Paste
            </button>
          </div>
        </div>

        {/* Available Balance */}
        <div className="text-center text-gray-500 mb-4">2.23 ETH available</div>

        {/* Amount Input */}
        <div className="text-center mb-8">
          {isUsdMode ? (
            <>
              <div className="text-5xl font-bold text-blue-600 mb-1 flex justify-center">
                <span className="mr-1">US$</span>
                <input
                  type="text"
                  className="bg-transparent border-none outline-none text-center w-48"
                  value={usdAmount}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value === "" || /^\d*\.?\d*$/.test(value)) {
                      setUsdAmount(value)
                      // Convert back to ETH
                      if (value) {
                        const ethValue = (Number.parseFloat(value) / ethToUsd).toFixed(6)
                        setAmount(ethValue)
                      } else {
                        setAmount("")
                      }
                    }
                  }}
                  placeholder="0.00"
                />
              </div>
              <div className="text-gray-500">{amount || "0"} ETH</div>
            </>
          ) : (
            <>
              <div className="text-5xl font-bold text-blue-600 mb-1 flex justify-center">
                <input
                  type="text"
                  className="bg-transparent border-none outline-none text-center w-32"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0"
                />
                <span className="ml-2">ETH</span>
              </div>
              <div className="text-gray-500">US${usdAmount}</div>
            </>
          )}
        </div>

        {/* Amount Controls */}
        <div className="flex justify-between mb-8">
          <button
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md"
            onClick={() => {
              setAmount("2.23")
              const usdValue = 2.23 * ethToUsd
              setUsdAmount(usdValue.toFixed(2))
            }}
          >
            Max
          </button>
          <button className="bg-gray-200 text-gray-600 p-2 rounded-full" onClick={toggleUnitDisplay}>
            {isUsdMode ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>

        {/* Network Fee */}
        <div className="text-center mb-8">
          <div className="text-gray-500">Network fee</div>
          <div className="text-gray-800">US$1.09 - US$1.23</div>
        </div>

        {/* Action Button - Added mt-auto to ensure it stays at the bottom */}
        <button
          className={`w-full py-4 rounded-md text-white font-medium text-lg mt-auto ${
            !address || !amount ? "bg-gray-300 cursor-not-allowed" : "bg-blue-950"
          }`}
          onClick={handleReview}
          disabled={!address || !amount}
        >
          {!address ? "Enter Address" : !amount ? "Enter Amount" : "Review"}
        </button>

      </main>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-0 left-0 w-full bg-blue-950 text-white rounded-t-3xl p-6 z-50"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Sending</h2>
              <button onClick={() => setShowConfirmation(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="/assets/image/ethereum.png"
                  alt="Ethereum"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-2xl font-bold">{amount} ETH</div>
                <div className="text-gray-400">US${usdAmount}</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-gray-400 mb-1">To</div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <CreditCard size={16} />
                </div>
                <div className="text-sm">
                  {address.substring(0, 6)}...{address.substring(address.length - 4)}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <div className="text-gray-400">Network</div>
                <div>Ethereum</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-400">Network fee</div>
                <div className="flex items-center">
                  <span>US$1.09 - US$1.23</span>
                  <Sliders size={16} className="ml-2" />
                </div>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-4 rounded-md text-lg font-medium"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  )
}