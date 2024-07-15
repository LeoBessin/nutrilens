'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/src/utils/supabase/server'

export async function signup(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    const userData = {
        username: formData.get('username') as string,
        email: formData.get('email') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        console.log(error)
        redirect('/error')
    }

    if(!error){
        const {error} = await supabase.from('Users').insert(userData)

        if(error){
            console.log(`Error during user creation: ${JSON.stringify(error)} | ${JSON.stringify(userData)}`)
        } else{
            console.log(`User created: ${JSON.stringify(data)}`)
        }
    }

    revalidatePath('/', 'layout')
    redirect('/login')
}