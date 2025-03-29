import { ArrowDown } from "lucide-react"

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-opacity-70 mx-4 rounded-lg mt-4 font-(family-name:--font-ibm-plex)">
      <div className="w-32 h-32 rounded-full border-2 border-navy-900 flex items-center justify-center mb-6">
        <ArrowDown size={48} className="text-navy-900" />
      </div>
      <h2 className="text-2xl font-bold text-navy-900 mb-2">No tokens found</h2>
      <p className="text-gray-500 text-center max-w-xs">
        Deposit tokens to your address or buy Ethereum to get started
      </p>
    </div>
  )
}

