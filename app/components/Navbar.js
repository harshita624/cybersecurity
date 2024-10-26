"use client";

import Link from "next/link";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlineAppstore, AiOutlineRead, AiOutlineMail } from "react-icons/ai"; // Importing icons from react-icons
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white px-4 h-16 flex justify-between items-center">
      <div className="flex items-center">
        <img className="rounded-full" src="/images/protect1.gif" width={44} height={44} alt="Logo" />
        <span className="ml-3 text-xl font-bold">CyberSecure</span>
      </div>
      <ul className="flex gap-8">
        <li>
          <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
            <AiOutlineHome className="mr-2" />
            <Link href="/">Home</Link>
          </motion.div>
        </li>
        <li>
          <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
            <AiOutlineInfoCircle className="mr-2" />
            <Link href="/about">About</Link>
          </motion.div>
        </li>
        <li>
          <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
            <AiOutlineAppstore className="mr-2" />
            <Link href="/services">Services</Link>
          </motion.div>
        </li>
        <li>
          <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
            <AiOutlineRead className="mr-2" />
            <Link href="/blog">Blog</Link>
          </motion.div>
        </li>
        <li>
          <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
            <AiOutlineMail className="mr-2" />
            <Link href="/contact">Contact</Link>
          </motion.div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
