import {createClient} from "@/src/utils/supabase/server";

export async function getDailyMeal({email}:{email: string}) {
    const supabase = createClient()
    const { data, error } = await supabase.from('UserMeals').select('*').eq('email', email)
    if (error) {
        console.log(error)
        throw error
    }
    return data;
}