"use client";
import {
  BellIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

const defaultClassName =
  "lg:hidden fixed bottom-4 left-1/2 right-1/2 w-[330px] -translate-x-1/2";

const Bottom: React.FC = () => {
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
    <button onClick={() => router.push(item.url)}>
      <item.icon width={30} height={30} />
    </button>
  ));
  return (
    <div className={defaultClassName}>
      <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-4">
        {links}
      </div>
    </div>
  );
};
export default Bottom;
