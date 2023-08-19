import { Header } from "./Header";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProps } from "./UserInfo";
import { auth } from "@/services/auth";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps>({ name: "aa", avatarUrl: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      auth().then((response) => {
        setUser(response);
      });
    }
  }, []);
  return (
    <>
      {user.name && <Header />}
      {user.name ? children : redirect("/")}
    </>
  );
}
