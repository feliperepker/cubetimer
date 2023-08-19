import { formatTime } from "@/app/helper/formatTime";
import { api } from "@/services/api";
import { Dosis } from "next/font/google";
import { useEffect, useState } from "react";

const dosis = Dosis({ subsets: ["latin"], weight: ["500"] });

export interface TimeInfoProps {
  id: string;
  time: number;
  createdAt: string;
  sequence: string;
}
export interface TimeProps {
  times: TimeInfoProps[];
}

export function TimeInfo({ times }: TimeProps) {
  const [avarege, setAvarege] = useState<number>(0);
  const [bestTime, setBestTime] = useState<number>(0);

  useEffect(() => {
    let sum = 0;
    let smallest = 20000000;
    if (times?.length > 0) {
      times?.forEach((item) => {
        sum += item.time;
        if (item.time < smallest) {
          smallest = item.time;
        }
      });
      setAvarege(sum / times?.length);
      setBestTime(smallest);
    }
  }, [times]);

  return (
    <div className="flex w-full justify-around mt-6">
      <div className="text-center">
        <p className="text-lg ">Your Avarege Time</p>
        <p className={`text-lg ${dosis.className}`}>{formatTime(avarege)}</p>
      </div>
      <div className="text-center">
        <p className="text-lg ">Your Best Time</p>
        <p className={`text-lg ${dosis.className}`}>{formatTime(bestTime)}</p>
      </div>
    </div>
  );
}
