import { Check, ArrowUp } from "lucide-react"

interface NotificationProps {
  type: "sending" | "sent"
  onClose?: () => void
}

export default function Notification({ type }: NotificationProps) {
  return (
    <div className="bg-blue-600 text-white p-4 rounded-lg flex items-center gap-4 animate-slide-down">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          type === "sent" ? "bg-green-500" : "bg-navy-900"
        }`}
      >
        {type === "sent" ? <Check size={24} /> : <ArrowUp size={24} />}
      </div>
      <div>
        <h3 className="font-medium text-lg">{type === "sent" ? "Token Sent" : "Sending Tokens"}</h3>
        <p className="text-blue-100 text-sm">
          {type === "sent"
            ? "Tap to view this transaction details"
            : "ETH will be withdrawn from your wallet once the transaction is complete"}
        </p>
      </div>
    </div>
  )
}

