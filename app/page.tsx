"use client";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Link from "next/link";


export default function Home() {
    const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="p-6">
        <h2>Welcome</h2>
        <Link href="/login">Sign in to your <b className="font-bold ">Register Account</b>.</Link>
    </div>
  );
}
