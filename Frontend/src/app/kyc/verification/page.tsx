"use client"

import { X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function VerificationPage() {
  const router = useRouter()

  const handleClose = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[url('/assets/app-background.png')] bg-cover bg-center bg-no-repeat font-(family-name:--font-ibm-plex)">
      {/* Header */}
      <header className="p-4">
        <button
          onClick={handleClose}
          className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white"
        >
          <X size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-center text-navy-900 mb-16">Account Verification</h1>

        <div className="mb-10">
          <p className="text-blue-950 leading-relaxed">
            The security and exchange commission requires we verify a valid means of identification.
          </p>
        </div>

        <div className="space-y-6">
          <VerificationItem label="BVN verification" status="verified" onClick={() => {}} />

          <VerificationItem label="ID verification" status="verified" onClick={() => {}} />

          <VerificationItem
            label="Phone Number"
            status="not-verified"
            onClick={() => router.push("/verification/phone")}
          />
        </div>
      </main>
    </div>
  )
}

interface VerificationItemProps {
  label: string
  status: "verified" | "not-verified"
  onClick: () => void
}


function VerificationItem({ label, status, onClick }: VerificationItemProps) {
  return (
    <div className="flex items-center justify-between cursor-pointer" onClick={onClick}>
      <span className="text-gray-500">{label}</span>
      <span className={`px-4 py-0.5 rounded-full text-white ${status === "verified" ? "bg-green-500" : "bg-red-500"}`}>
        {status === "verified" ? "Verified" : "Not Verified"}
      </span>
    </div>
  )
}

