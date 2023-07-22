"use client";
import { AuthLayout } from "@/components/AuthLayout";
import { TimeInfo } from "@/components/TimeInfo";
import { Timer } from "@/components/Timer";
import { Dosis } from "next/font/google";
import { useEffect, useState } from "react";

export default function TimerPage() {
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
    <AuthLayout>
      <main className="flex  min-h-screen flex-col items-center justify-between p-24">
        <div className="max-w-7xl flex flex-col justify-center items-center">
          <Timer sequence={shuffle?.toString()!} shuffleCube={shuffleCube} />
          <div className="flex flex-wrap w-full justify-center gap-3 mt-4">
            {shuffle?.map((item, idx) => {
              return <p key={idx}>{item}</p>;
            })}
          </div>
          <TimeInfo />
        </div>
      </main>
    </AuthLayout>
  );
}
