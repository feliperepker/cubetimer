import { ReactNode } from "react";
import { Header } from "./Header";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return (
    <>
      {user.name && <Header />}
      {user.name ? children : redirect("/")}
    </>
  );
}
