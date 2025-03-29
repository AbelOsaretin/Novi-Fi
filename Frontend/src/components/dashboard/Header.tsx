import { Settings, Bell, ScanLine } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Header() {

  const router = useRouter();

  const handleClose = () => {
    router.push("/kyc/verification")
  }

  return (
    <header className="p-4 flex justify-between items-center font-(family-name:--font-ibm-plex)">
      <button className="text-blue-600" onClick={handleClose}>
        <Settings size={24} />
      </button>
      <div className="flex gap-4">
        <button className="text-blue-600">
          <Bell size={24} />
        </button>
        <button className="text-blue-600">
          <ScanLine size={24} />
        </button>
      </div>
    </header>
  )
}

