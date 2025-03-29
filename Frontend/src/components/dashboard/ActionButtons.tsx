import { Plus, ArrowDown, ArrowUp, ArrowLeftRight } from "lucide-react";
import { useRouter } from "next/navigation";


interface ActionButtonsProps {
  hasTransactions: boolean
}

export default function ActionButtons({ hasTransactions }: ActionButtonsProps) {

    const router = useRouter()

    const handleSendClick = () => {
        router.push("/send")
    }

  return (
    <div className="flex justify-center gap-8 mt-4 py-3 bg-white bg-opacity-50 mx-4 rounded-lg">
      <button className="flex flex-col items-center gap-1">
        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <Plus size={24} />
        </div>
        <span className="text-blue-600 font-medium">Buy</span>
      </button>

      {hasTransactions && (
        <>
          <button className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <ArrowLeftRight size={24} />
            </div>
            <span className="text-blue-600 font-medium">Swap</span>
          </button>

          <button className="flex flex-col items-center gap-1" onClick={handleSendClick}>
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <ArrowUp size={24} />
            </div>
            <span className="text-blue-600 font-medium">Send</span>
          </button>
        </>
      )}

      <button className="flex flex-col items-center gap-1">
        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <ArrowDown size={24} />
        </div>
        <span className="text-blue-600 font-medium">Receive</span>
      </button>
    </div>
  )
}

