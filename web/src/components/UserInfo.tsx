"use client";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

interface UserInfoProps {}

export function UserInfo(props: UserInfoProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className="h-full relative cursor-pointer flex items-center  w-auto px-4 duration-300  hover:bg-primary"
    >
      <img
        src={user.avatarUrl}
        alt="User photo"
        className="w-8 h-8  rounded-full"
      />
      <div
        className={`w-40 h-40 text-sm flex flex-col rounded shadow-sm bg-secondary right-0 absolute top-full ${
          !open && "hidden"
        }`}
      >
        <h2 className="m-2">Hello, {user.name}!</h2>
        <button
          onClick={() => console.log("oi")}
          className="w-full mt-auto h-10 rounded-b-sm hover:bg-primary duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
