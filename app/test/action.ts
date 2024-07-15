'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/src/utils/supabase/server'

export async function addUser() {
    const supabase = createClient()

    const { error } = await supabase.auth.signOut()

    const data = {
        username: "00h37",
        email: "leo.bessin@gmail.com",
    }

    if (error) {
        redirect('/error')
    } else{
        const {error} = await supabase.from('Users').insert([data])
        if(error){
            console.log(`Error during user creation: ${JSON.stringify(error)} | ${JSON.stringify(data)}`)
        }
    }



    revalidatePath('/', 'layout')
    redirect('/login')
}

export async function createMealTemplate() {
    const supabase = createClient()

    const mealData = {
        created_by:"4df10650-ab0c-4007-a8c4-f2b302a073c8",
        calories: 500,
        protein: 70,
        fiber: 80,
        fat: 90,
        meal_name: "Pizza",
        meal_description: "Pizza with tomato sauce and cheese",
    }

    const {error} = await supabase.from('MealTemplates').insert(mealData)

    if(error){
        console.log(`Error during meal creation: ${JSON.stringify(error)} | ${JSON.stringify(mealData)}`)
    } else{
        console.log(`mealData created: ${JSON.stringify(mealData)}`)
    }

}

export async function createUserMeal() {
    const supabase = createClient()

    const mealData = {
        user_id:"4df10650-ab0c-4007-a8c4-f2b302a073c8",
        template_id:"8fa9ef78-b981-44bd-8444-e1fd2fcfaa30"
    }

    const {error} = await supabase.from('UserMeals').insert(mealData)

    if(error){
        console.log(`Error during meal creation: ${JSON.stringify(error)} | ${JSON.stringify(mealData)}`)
    } else{
        console.log(`mealData created: ${JSON.stringify(mealData)}`)
    }

}