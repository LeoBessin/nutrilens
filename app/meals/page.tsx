import React from 'react';
import NavBar from "@/src/components/NavBar";
import {createClient} from "@/src/utils/supabase/server";
import MealsGrid from "@/app/meals/MealsGrid";

const Page = async () => {
    const supabase = createClient()

    const {
        data: {user},
    } = await supabase.auth.getUser()
    return (
        <>
            <MealsGrid email={user?.email as string}/>
            <NavBar email={user?.email as string}/>
        </>
    );
};

export default Page;