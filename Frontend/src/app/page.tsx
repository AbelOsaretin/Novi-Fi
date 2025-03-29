import MainLayout from "@/components/layouts/MainLayout";
import SplashScreenImage from "@/components/layouts/SplashScreenImage";
import ConnectButton from "@/components/ui/ConnectButton";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center gap-8 mt-10">
        <SplashScreenImage src="/assets/splash-screen.svg" alt="plash Image" width={400} height={400} className="object-contain"></SplashScreenImage>
      </div>
      <ConnectButton href="/connect-wallet"  text="Connect Wallet"></ConnectButton>
    </MainLayout>
  );
}
