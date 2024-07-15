import React, {useCallback, useEffect, useState} from 'react';
import {Edit, Plus} from "lucide-react";
import {createClient} from "@/src/utils/supabase/client";
import UserLogo from '@/src/components/UserLogo';
import Link from "next/link";

const MealCard = ({meal}:{meal:{
    meal_name:string,
        meal_description:string,
        serving_size:string,
        calories:number,
        protein:number,
        fiber:number,
        fat:number,
        created_by:string,
    }}) => {
    const supabase = createClient();
    const [user, setUser] = useState<any>()
    const getUser = useCallback(async () => {
        try {
            const { data, error } = await supabase.from('Users').select('*').eq('id', meal.created_by).single()

            if (error) {
                console.log(error)
                throw error
            }

            if (data) {
                setUser(data)
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        }}, [])
    useEffect(() => {
        getUser()
    }, [meal, supabase])
    return (


        <div
            className="max-w-sm bg-primary-300 border border-gray-200 rounded-lg shadow flex flex-col relative">
            <a href="#">
                <img className="rounded-t-lg w-full flex-non transition-all hover:scale-105 cursor-pointer" src="/defaultPictureMeal.png" alt=""/>
            </a>
            <div className="p-5 flex flex-col gap-0 flex-1">
                    <a href="#">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900">{meal.meal_name}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 text-sm lg:text-lg">{meal.meal_description}</p>

                    {meal.serving_size? <p className="font-normal text-gray-700">Per {meal.serving_size} grams :</p>:''}
                    <div className="flex flex-col md:flex-row gap-1 text-sm mb-3 lg:gap-4">
                        <p>Calories : {meal.calories}</p>
                        <p>Protein : {meal.protein}</p>
                        <p>Fiber : {meal.fiber}</p>
                        <p>Fat : {meal.fat}</p>
                    </div>
                <div className="flex mt-auto justify-between">
                    <button
                       className="inline-flex transition-all hover:scale-110 cursor-pointer w-fit gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-100 rounded-lg focus:ring-4 focus:outline-none focus:ring-primary-200">
                        <p className="hidden lg:block">Add to my daily meals</p>
                        <Plus/>
                    </button>
                    <button
                       className="inline-flex transition-all hover:scale-110 cursor-pointer w-fit gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-100 rounded-lg focus:ring-4 focus:outline-none focus:ring-primary-200">
                        <Edit/>
                    </button>
                </div>
            </div>
                {user?
                    <Link href={`/public/${user.username}`} className='absolute transition-all hover:scale-110 cursor-pointer z-10 top-0 right-0 translate-x-1/3 -translate-y-1/3 flex bg-primary-100 p-1 rounded-full items-center gap-2'>
                        <UserLogo email={user.email} size={40}/>
                    </Link>

                    :''}
        </div>

    );
};

export default MealCard;