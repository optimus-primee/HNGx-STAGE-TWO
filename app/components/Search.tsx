"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import search from "../assests/images/Search.png";
const Search = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const searchMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`search?movie=${input}`);
    setInput("");
  };
  

  return (
    <div>
     

        <form onSubmit={searchMovie}>
   
            <div className="lg:w-[512px] md:w-[450px] ss:w-[350px] xs:w-[250px] sx:w-[220px]  h-[36px] border-[2px] rounded-[6px] border-[#D1D5DB] flex justify-between items-center px-3">
              <input
                className="w-[100%] h-[100%]  text-white bg-transparent outline-none"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Image src={search} width={16} height={16} alt=""
                 
              />
   
          </div>
        </form>
     
    </div>
  );
};

export default Search;