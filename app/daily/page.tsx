import React from 'react';
import AccountForm from "@/app/account/account-form";
import NavBar from "@/src/components/NavBar";
import {createClient} from "@/src/utils/supabase/server";
import DailyTimeLine from "@/app/daily/DailyTimeLine";
import Link from "next/link";

const Page = async () => {
    const supabase = createClient()

    const {
        data: {user},
    } = await supabase.auth.getUser()
    return (
        <>
            <DailyTimeLine email={user?.email as string}/>
            <Link className="font-bold" href="/meals">Search meal</Link>
            <NavBar email={user?.email as string}/>
        </>
    );
};

export default Page;