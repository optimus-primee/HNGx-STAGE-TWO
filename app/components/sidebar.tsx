"use client";
import {
  BellIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import tv from "../assests/images/tv.png";


const Sidebar: React.FC = () => {
  const router = useRouter();
  const items = [
    {
      url: "/",
      text: "Home",
      icon: HomeIcon,
    },
    {
      url: "/search",
      text: "Search",
      icon: MagnifyingGlassIcon,
    },
    {
      url: "/",
      text: "Notifications",
      icon: BellIcon,
    },
    {
      url: "/",
      text: "Notifications",
      icon: BellIcon,
    },
  ];
  const links = items.map((item) => (
    <button onClick={() => router.push(item.url)} className="flex gap-3 items-center ">
            
      <item.icon width={30} height={30} />
      <h5>{item.text}</h5>

    </button>
  ));
  return (
    <div className="flex-col justify-between h-[100vh]  sm:flex hidden border border-[#BE123C] p-5 rounded-r-[45px]">
         <div>
         <Link href="/" >
          <div className="flex gap-6 items-center">
          
            <Image src={tv} width={40} height={50} alt="" />
            <h3 className="sm:flex hidden text-[24px] font-bold text-[#FFF]">MovieBox</h3>
            </div>
          </Link>
         </div>
      <div className="flex flex-col gap-8 ">
        {links}
      </div>
      <div className="text-[15px] w-[180px]  py-12 px-5 border border-[#BE123CB2] rounded-[20px]">
        <h5 className="w-[110px] text-[15px]">Play movie quizes and earn free tickets</h5>
        <h5 className="w-[140px] text-[12px]">50k people are playing now</h5>
        <button className="py-2.5 px-4 bg-[#BE123C33] text-[#BE123C] rounded-[30px]">Start Playing</button>
      </div>
      <button className="flex gap-4 items-center">
            
            <FiLogOut/>
            <h5>Logout</h5>
      
          </button>
    </div>
  );
};
export default Sidebar;
