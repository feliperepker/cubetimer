import { formatTime } from "@/app/helper/formatTime";
import { api } from "@/services/api";
import { TimeInfoProps } from "./TimeInfo";
import { useEffect, useState } from "react";

export interface DeleteProps {
  times: TimeInfoProps[];
  setTimes: any;
}

export function DeleteLast({ times, setTimes }: DeleteProps) {
  const [lastTime, setLastTime] = useState<number>(0);

  console.log(times);
  useEffect(() => {
    setLastTime(times && times[times?.length - 1].time);
  }, [times]);

  function deleteLastItem() {
    api.delete("/time/deletelast").then((response) => {
      if (response.status === 200) {
        let newState = [...times];
        newState.pop();
        setTimes(newState);
      }
    });
  }
  return (
    <div className="w-full mt-4 flex justify-center gap-4 items-center">
      <div className="text-center gap-2">
        <p>Last Time</p>
        <p>{formatTime(lastTime)}</p>
      </div>
      <button
        onClick={() => {
          deleteLastItem();
        }}
        className="px-3 py-2 text-sm rounded bg-red-500 hover:bg-red-400 duration-300"
      >
        Delete
      </button>
    </div>
  );
}
