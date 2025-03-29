"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Footer from "@/components/dashboard/Footer"
import { mockTransactions } from "@/data/mock-transactions"
import { useState } from "react"

export default function Wallet() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("crypto")

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleSelectToken = (tokenId: string) => {
    router.push(`/send?token=${tokenId}`)
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

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex justify-center">
          <button
            className={`px-4 py-2 text-lg font-medium ${
              activeTab === "crypto" ? "border-b-2 border-navy-900 text-navy-900" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("crypto")}
          >
            Crypto
          </button>
          <button
            className={`px-4 py-2 text-lg font-medium ${
              activeTab === "contacts" ? "border-b-2 border-navy-900 text-navy-900" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("contacts")}
          >
            Contacts
          </button>
        </div>
      </div>

      {/* Token List */}
      <div className="flex-1 overflow-y-auto pb-16">
        {activeTab === "crypto" && (
          <div className="divide-y divide-gray-100">
            {mockTransactions.map((token) => (
              <div
                key={token.id}
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => handleSelectToken(token.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={token.icon || "/placeholder.svg"}
                      alt={token.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{token.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">${token.price.toFixed(2)}</span>
                      <span className={`text-xs ${token.changePercentage >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {token.changePercentage >= 0 ? "+" : ""}
                        {token.changePercentage.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${token.balanceUSD.toFixed(2)}</div>
                  <div className="text-gray-500 text-sm">
                    {token.tokenAmount.toLocaleString("en-US", { maximumFractionDigits: 2 })} {token.symbol}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="p-8 text-center text-gray-500">
            <p>No contacts found</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

