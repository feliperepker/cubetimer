"use client";
import { ReactNode, createContext, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { api } from "../services/api";
import { useRouter } from "next/navigation";
interface UserProps {
  name: string;
  avatarUrl: string;
}
export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({ name: "", avatarUrl: "" });
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await api.post("/users", {
        access_token: tokenResponse.access_token,
      });
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      const userInfoResponse = await api.get("/me");
      setUser(userInfoResponse.data.user);
      router.push("/timer");
    },
  });
  console.log(user);
  async function signIn() {
    login();
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: user!,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
