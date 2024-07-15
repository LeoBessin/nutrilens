"use client"

import React from 'react';
import {AreaChart, Flame} from "lucide-react";
import Avatar from "./UserLogo";
import Link from "next/link";
const NavBar = ({email}:{email:string}) => {

    return (
        <nav className="fixed z-20 bg-primary-300/90 backdrop-blur w-11/12 lg:w-1/3 px-6 py-4 rounded-full lg:bottom-16 bottom-8 mx-12 self-center
        flex justify-between max-h-14 items-center drop-shadow-lg">
            <button className=" p-5 rounded-full transition-all">
                <AreaChart className="text-white"/></button>
            <Link href="/daily" className="bg-primary-200/90 backdrop-blur p-5 rounded-full transition-all active:scale-110">
                <Flame className="text-white"/></Link>
            <Link href="/account" className="bg-primary-100/60 p-1 transition-all hover:scale-110 cursor-pointer rounded-full">
                <Avatar size={40} email={email} />
            </Link>
        </nav>
    );
};

export default NavBar;