import { api } from "@/services/api";
import { Dosis } from "next/font/google";
import { useEffect, useState } from "react";

const dosis = Dosis({ subsets: ["latin"], weight: ["500"] });

interface TimeInfoProps {}

export function TimeInfo(props: TimeInfoProps) {
  const [times, setTimes] = useState();

  useEffect(() => {
    api.get("/time/findbyuser").then((response) => {
      setTimes(response.data);
    });
  }, []);

  return (
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
  );
}
