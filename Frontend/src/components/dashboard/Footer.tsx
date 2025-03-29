import { Clock, Wallet, Compass } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Footer() {

  const router = useRouter()
  const handleClick = () => {
    router.push("/wallet")
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 z-20">
      <div className="flex justify-between items-center">
        <button className="flex flex-col items-center">
          <Clock size={24} />
        </button>
        <button className="flex flex-col items-center" onClick={handleClick}>
          <Wallet size={24} />
        </button>
        <button className="flex flex-col items-center">
          <Compass size={24} />
        </button>
      </div>
    </footer>
  )
}

