import AccountForm from './account-form'
import { createClient } from '@/src/utils/supabase/server'
import NavBar from "@/src/components/NavBar";

export default async function Account() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <>
          <AccountForm user={user} />
            <NavBar email={user?.email as string}/>
        </>)
}