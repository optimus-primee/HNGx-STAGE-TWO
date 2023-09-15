import React from "react";
import Image from "next/image";
import menu from "../assests/images/menu.svg"
import tv from "../assests/images/tv.png";

import Search from "./Search";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed w-[100%] z-10">
      <div className="py-4 lg:px-24  px-4 flex justify-between items-center w-[100%]">
      
          <Link href="/" >
          <div className="flex gap-6 items-center">
          
            <Image src={tv} width={50} height={50} alt="" />
            <h3 className="sm:flex hidden text-[24px] font-bold text-[#FFF]">MovieBox</h3>
            </div>
          </Link>
       
        <div>
       <div className="sm:flex hidden">
           <Search />
       </div>
        </div>
        <div>
          <div className="flex sm:gap-7 xs:gap-5 gap-4 items-center">
            <h3 className="text-[#FFF] text-base sm:flex hidden">Sign in</h3>
            <div className="p-[6px] rounded-full bg-[#BE123C] cursor-pointer">
              <Image src={menu} width={24} height={24} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
