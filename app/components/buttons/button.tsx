"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
const getVariant = (variant?: VariantType) => {
    switch (variant) {
      case "primary":
        return "bg-[#BE123C] hover:bg-black text-white shadow shadow-black-600/25 hover:shadow-black-600/75";
    
      
  
      default:
        return "bg-violet-500 hover:bg-violet-700 text-white shadow shadow-violet-600/25 hover:shadow-violet-600/75";
    }
  };
  
  type VariantType =
    | "primary"
    
  
  export interface IButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children?: React.ReactNode;
    variant?: VariantType;
    square?: boolean;
    paddingLess?: boolean;
    imgSrc?: string;
    imgAlt?: string;
    iconPresent ?:string;
    OnClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  }
  export const Button = ({
    className,
    children,
    variant,
    square,
    paddingLess,
    type = "button",
    onClick,
    imgSrc, 
    imgAlt, 
    iconPresent,
    ...props
  }: IButtonProps) => {
    return (
      <button
        {...props}
        type={type}
        onClick={onClick}

        className={`
   
          ${getVariant(variant)}  transition duration-75  ${
          !paddingLess && "sm:px-[16px] sm:py-[6px] px-4 py-4 text-sm"
        }  ${!square && "rounded sm:rounded-[5px]"} active:scale-95 ${className}  ${!iconPresent &&
            "flex justify-center items-center gap-2"} text-sm font-medium uppercase`} 
      >
         {imgSrc && <Image src={imgSrc} alt="" width={20} height={20} />} 
        {children}
      </button>
    );
  };
