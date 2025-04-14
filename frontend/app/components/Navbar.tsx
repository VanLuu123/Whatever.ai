import React from "react";
import Image from "next/image";
import cat from "/imgs/cat_img.png";
import { GoSidebarCollapse } from "react-icons/go";
import { BiMessageAdd } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav className="fixed w-full px-6 py-4 flex justify-between">
      <div className="flex items-center gap-2">
        <button className="text-gray-800 hover:text-black transition">
          <GoSidebarCollapse size={20} />
        </button>
        <Image
          src={cat}
          alt="cat"
          width={50}
          height={50}
          className="rounded-full"
        />
        <h1 className="text-xl font-bold text-gray-800">Coffee GPT</h1>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <button className="text-gray-700 hover:text-black transition">
          <BiMessageAdd size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
