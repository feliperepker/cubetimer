"use client";
import { api } from "@/services/api";
import { Dosis } from "next/font/google";
import { useState, useEffect, useRef } from "react";
const dosis = Dosis({ subsets: ["latin"], weight: ["500"] });

interface TimerProps {
  shuffleCube: () => void;
  sequence: string;
}

export function Timer({ shuffleCube, sequence }: TimerProps) {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const setTimeInDb = async (time: number) => {
    const item = await api.post("/time", {
      time,
      sequence,
      userId: "",
    });
  };

  useEffect(() => {
    if (isRunning) {
      setStartTime(Date.now());

      timerRef.current = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(currentTime - (startTime || 0));
      }, 10);
    } else {
      clearInterval(timerRef.current!);
      timerRef.current = null;
      setElapsedTime(0);
    }

    return () => {
      clearInterval(timerRef.current!);
    };
  }, [isRunning, startTime]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeInDb(elapsedTime);
    shuffleCube();
  };

  const formatTime = () => {
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor(elapsedTime % 1000);

    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === 32 && !event.repeat) {
        event.preventDefault();
        console.log(isRunning); // Aqui você pode acessar o valor atual de isRunning
        setIsRunning((prevIsRunning) => !prevIsRunning);
        if (isRunning) {
          shuffleCube();
          setTimeInDb(elapsedTime);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRunning, shuffleCube]);
  return (
    <>
      <p className="text-center">
        Press the button or the space key to {isRunning ? "stop" : "start"} the
        timer.
      </p>
      <p className={`${dosis.className} text-5xl mt-4`}>{formatTime()}</p>
      <button
        onClick={isRunning ? stopTimer : startTimer}
        className="mt-10 bg-purple-600 hover:bg-purple-500 duration-300 rounded w-2/3 min-w-[300px] h-20"
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </>
  );
}
