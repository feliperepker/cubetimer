"use client";
import { AuthLayout } from "@/components/AuthLayout";
import { DeleteLast } from "@/components/DeleteLast";
import { ProgressGraph } from "@/components/ProgressGraph";
import { TimeInfo, TimeInfoProps } from "@/components/TimeInfo";
import { Timer } from "@/components/Timer";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

export default function TimerPage() {
  const [times, setTimes] = useState<TimeInfoProps[]>([]);
  useEffect(() => {
    api.get("/time/findbyuser").then((response) => {
      setTimes(response.data.time);
    });
  }, []);

  return (
    <AuthLayout>
      <main className="flex  min-h-screen flex-col items-center justify-between p-24">
        <div className="max-w-7xl flex flex-col justify-center items-center">
          <ProgressGraph userTime={times} />
        </div>
      </main>
    </AuthLayout>
  );
}
