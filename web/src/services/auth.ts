import { api } from "./api";

export async function auth() {
  const userInfo = localStorage?.getItem("user-cubetimer");
  const userToken = localStorage?.getItem("token-cubetimer");

  api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

  return userInfo !== null ? JSON.parse(userInfo) : { name: "", avatarUrl: "" };
}
