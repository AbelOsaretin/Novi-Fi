import React from 'react'
import Image from "next/image";

interface SplashScreenImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}


const SplashScreenImage = ({src, alt, width, height, className}: SplashScreenImageProps) => {
  return (
    <div className="flex flex-col items-center gap-8 mt-20">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
        />
        <Image
          src="/assets/logo.png"
          alt="Nova FI"
          width={200}
          height={50}
          className="object-contain mt-20"
        />
  </div>
  )
}

export default SplashScreenImage