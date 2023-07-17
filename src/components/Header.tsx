import { Chakra_Petch } from "next/font/google";
import { UserInfo } from "./UserInfo";
const chakraPetch = Chakra_Petch({ subsets: ["latin"], weight: ["700"] });

interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <header className="max-w-screen w-full fixed h-16 bg-secondary flex items-center justify-center shadow-md">
      <div className="w-full max-w-7xl h-full flex justify-around items-center">
        <h1 className={`${chakraPetch.className} hover:cursor-pointer text-xl`}>
          <span className="text-red-400">C</span>U
          <span className="text-blue-400">B</span>E
          <span className="text-yellow-400">T</span>I
          <span className="text-green-400">M</span>E
          <span className="text-orange-400">R</span>
        </h1>
        <div className="h-full flex gap-4">
          <nav className="flex gap-4 transition-all items-center text-sm">
            <a href="/" className="hover:text-gray-200">
              Timer
            </a>
            <a href="" className="hover:text-gray-200">
              Progress
            </a>
          </nav>
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
