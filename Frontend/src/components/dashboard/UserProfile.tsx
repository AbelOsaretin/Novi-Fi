import { ChevronDown } from "lucide-react"
import Image from "next/image"

interface UserProfileProps {
  username: string
}

export default function UserProfile({ username }: UserProfileProps) {
  return (
    <div className="flex justify-center items-center mt-4 font-(family-name:--font-ibm-plex)">
      <div className="flex items-center gap-2 bg-white bg-opacity-70 px-4 py-2 rounded-full">
        <div className="w-10 h-10 rounded-full bg-blue-200 overflow-hidden">
          <Image
            src="/assets/image/userprofile.png?height=40&width=40"
            alt="User avatar"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <span className="text-lg font-medium">{username}</span>
        <ChevronDown size={16} />
      </div>
    </div>
  )
}

