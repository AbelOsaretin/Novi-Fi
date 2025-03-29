'use client'
import type { Transaction } from "@/types"
import Image from "next/image"

interface TransactionsListProps {
  transactions: Transaction[]
}


export default function TransactionsList({ transactions }: TransactionsListProps) {
  return (
    <div className="px-4 divide-y divide-gray-100 space-y-2 font-(family-name:--font-ibm-plex)">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="py-4 flex items-center justify-between bg-opacity-80 rounded-lg my-1 px-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={transaction.icon || "/placeholder.svg"}
                alt={transaction.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{transaction.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">${transaction.price.toFixed(2)}</span>
                <span className={`text-xs ${transaction.changePercentage >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {transaction.changePercentage >= 0 ? "+" : ""}
                  {transaction.changePercentage.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">${transaction.balanceUSD.toFixed(2)}</div>
            <div className="text-gray-500 text-sm">
              {transaction.tokenAmount.toLocaleString("en-US", { maximumFractionDigits: 2 })} {transaction.symbol}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


