"use client";
import { Navigator, Swapper, Web3ContextProvider } from "./components/Index";

export default function Home() {
  
  return (
    <Web3ContextProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <Navigator />
        <Swapper />
      </div>
    </Web3ContextProvider>

  );
}