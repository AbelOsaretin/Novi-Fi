import React from 'react'
import Image from "next/image";

interface WalletButtonProps {
    iconSrc: string;
    text: string;
    onClick?: () => void;
  }
function WalletConnectBtn({ iconSrc, text, onClick }: WalletButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 p-1.5 rounded w-full hover:bg-gray-100 transition font-(family-name:--font-ibm-plex)">
      <Image src={iconSrc} alt={`${text} logo`} width={20} height={20} />
      <span className='font-(family-name:--font-ibm-plex) text-sm'>{text}</span>
    </button>
  )
}

export default WalletConnectBtn