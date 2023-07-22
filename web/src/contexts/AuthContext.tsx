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
  const userInfo = localStorage.getItem("user-cubetimer");
  const userToken = localStorage.getItem("token-cubetimer");
  const [user, setUser] = useState<UserProps>(
    userInfo ? JSON.parse(userInfo) : { name: "", avatarUrl: "" }
  );
  const router = useRouter();

  if (userInfo && userToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      userToken
    )}`;
  }
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await api.post("/users", {
        access_token: tokenResponse.access_token,
      });
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      const userInfoResponse = await api.get("/me");
      console.log(userInfoResponse.data.user);
      localStorage.setItem(
        "user-cubetimer",
        JSON.stringify(userInfoResponse.data.user)
      );
      localStorage.setItem("token-cubetimer", response.data.token);
      setUser(userInfoResponse.data.user);
      router.push("/timer");
    },
  });

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
