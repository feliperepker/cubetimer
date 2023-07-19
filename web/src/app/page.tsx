"use client";
import { Timer } from "@/components/Timer";
import { Dosis } from "next/font/google";
import { useEffect, useState } from "react";
const dosis = Dosis({ subsets: ["latin"], weight: ["500"] });

export default function Home() {
  const [shuffle, setShuffle] = useState<string[]>();

  useEffect(() => {
    shuffleCube();
  }, []);

  function shuffleCube() {
    let scramble = [];
    let lastMove = "";

    while (scramble.length < 20) {
      let result = createShuffleItem();
      if (result[0] === lastMove) {
      } else {
        lastMove = result[0];
        scramble.push(result[0] + result[1]);
      }
    }
    setShuffle(scramble);
  }

  function createShuffleItem() {
    let moves = ["R", "L", "U", "D", "F", "B"];
    let modifiers = ["", "'", "2"];
    let move = moves[Math.floor(Math.random() * moves.length)];
    let modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    return [move, modifier];
  }

  return (
    <main className="flex  min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-7xl flex flex-col justify-center items-center">
        <Timer />
        <div className="flex flex-wrap w-full justify-center gap-3 mt-4">
          {shuffle?.map((item, idx) => {
            return <p key={idx}>{item}</p>;
          })}
        </div>
        <div className="flex w-full justify-around mt-8">
          <div className="text-center">
            <p>Your Avarege time</p>
            <p className={`text-lg ${dosis.className}`}>0:00:00.0</p>
          </div>
          <div className="text-center">
            <p className="text-lg ">Your Best time</p>
            <p className={`text-lg ${dosis.className}`}>0:00:00.0</p>
          </div>
        </div>
      </div>
    </main>
  );
}
