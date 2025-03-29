"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import EmptyState from "./EmptyState"
import TransactionsList from "./TransactionsList"
import Notification from "./Notification"
import UserProfile from "./UserProfile"
import ActionButtons from "./ActionButtons"
import type { Transaction } from "@/types"
import { mockTransactions } from "@/data/mock-transactions"
import { useSearchParams } from "next/navigation"

export default function Dashboard() {
    const searchParams = useSearchParams()
    const status = searchParams.get("status")
  
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [notification, setNotification] = useState<"sending" | "sent" | null>(null)
  
    useEffect(() => {
      // Simulate API call to fetch transactions
      const fetchTransactions = () => {
        setTimeout(() => {
          setTransactions(mockTransactions)
          setIsLoading(false)
        }, 1000)
      }
  
      fetchTransactions()
    }, [])
  
    useEffect(() => {
      if (status === "sending") {
        setNotification("sending")
      } else if (status === "sent") {
        setNotification("sent")
  
        // Auto-hide the notification after 5 seconds
        const timer = setTimeout(() => {
          setNotification(null)
        }, 5000)
  
        return () => clearTimeout(timer)
      }
    }, [status])
  
    const calculateTotalBalance = () => {
      if (transactions.length === 0) return "0.00"
      return transactions
        .reduce((total, transaction) => total + transaction.balanceUSD, 0)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  
    return (
      <div className="flex flex-col min-h-screen bg-white relative">
        {/* Background Image */}
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: "url('/assets/app-background.png')" }}
        />
  
        {/* Content */}
        <div className="relative z-10 flex flex-col h-screen">
          <Header />
  
          {/* Notification */}
          {notification && (
            <div className="absolute top-16 left-0 right-0 px-4 z-30">
              <Notification type={notification} onClose={() => setNotification(null)} />
            </div>
          )}
  
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-none">
              <UserProfile username="disual0" />
  
              <div className="text-center my-6">
                <h1 className="text-4xl font-bold text-navy-900">${calculateTotalBalance()}</h1>
              </div>
  
              <ActionButtons hasTransactions={transactions.length > 0} />
  
              <div className="mt-4">
                <div className="text-center border-b border-gray-200 pb-2">
                  <span className="text-lg font-medium inline-block border-b-2 border-navy-900 pb-2 px-4">Crypto</span>
                </div>
              </div>
            </div>
  
            {/* Scrollable Transaction List */}
            <div className="flex-1 overflow-y-auto pb-16">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : transactions.length > 0 ? (
                <TransactionsList transactions={transactions} />
              ) : (
                <EmptyState />
              )}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    )
  }

