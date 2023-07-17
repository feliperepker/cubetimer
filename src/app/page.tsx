import { Dosis } from "next/font/google";
const dosis = Dosis({ subsets: ["latin"], weight: ["500"] });

export default function Home() {
  return (
    <main className="flex  min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-7xl flex flex-col justify-center items-center">
        <p>Press space or click in the button to start the timer</p>
        <p className={`text-5xl mt-4 ${dosis.className}`}>0:00:00.00</p>
        <button>Start</button>
      </div>
    </main>
  );
}
