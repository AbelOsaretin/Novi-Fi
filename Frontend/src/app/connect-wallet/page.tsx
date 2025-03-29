"use client";
import MainLayout from "@/components/layouts/MainLayout";
import SplashScreenImage from "@/components/layouts/SplashScreenImage";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import WalletConnectBtn from "@/components/ui/WalletConnectBtn";
import ConnectingIndicator from "@/components/connect-wallet/ConnectingIndicator";

export default function Home() {

    const [connecting, setConnecting] = useState(false);
    const router = useRouter();

    const handleConnect = () => {
        setConnecting(true);
        setTimeout(() => {
        router.push("/kyc/step2");
        }, 2000); // Delay for simulation
    };

  return (
    <MainLayout>
      <div className="flex flex-col items-center gap-8 mt-10">
        <SplashScreenImage src="/assets/illustration.svg" alt="plash Image" width={400} height={400} className="object-contain"></SplashScreenImage>
      </div>

      <div className="bg-white rounded-t-2xl p-6 shadow-lg border border-gray-300 w-full max-w-md mx-auto">
        {!connecting ? (
          <>
            <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-4 w-full">
              <h2 className="font-mono font-bold">Connect Account</h2>
              <button onClick={() => router.back()}>✕</button>
            </div>
            <p className="mb-4">Select Wallet</p>
            <div className="grid grid-cols-2 gap-4">
                <WalletConnectBtn
                    iconSrc="/assets/metamaskW.png"
                    text="Metamask"
                    onClick={handleConnect}
                />
              <WalletConnectBtn
                    iconSrc="/assets/safepal.png"
                    text="Safepal"
                    onClick={handleConnect}
                />

                <WalletConnectBtn
                    iconSrc="/assets/coinbaseW.png"
                    text="Coinbase"
                    onClick={handleConnect}
                />

                <WalletConnectBtn
                    iconSrc="/assets/walletConnectW.png"
                    text="Wallet connect"
                    onClick={handleConnect}
                />

            </div>
          </>
        ) : (
          <ConnectingIndicator />
        )}
      </div>
    </MainLayout>
  );
}
