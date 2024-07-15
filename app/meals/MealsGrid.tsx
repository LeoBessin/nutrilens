"use client"

import React, {useCallback, useEffect, useState} from 'react';
import {createClient} from "@/src/utils/supabase/client";
import MealCard from "@/app/meals/MealCard";
import {ChefHat, Plus} from "lucide-react";
import ModalMealTemplate from "@/src/components/ModalMealTemplate";
import SearchBar from "@/app/meals/SearchBar";

const MealsGrid = ({email}:{email:string}) => {
    const supabase = createClient()
    const [defaultMeals, setDefaultMeals] = useState<any[]>([])
    const [meals, setMeals] = useState<any[]>(defaultMeals)
    const [showModal, setShowModal] = useState(false)
    const getMeals = useCallback(async () => {
        async function downloadImage(path: string) {
            try {
                const { data, error } = await supabase.storage.from('avatars').download(path)
                if (error) {
                    throw error
                }

                const url = URL.createObjectURL(data)
            } catch (error) {
                console.log('Error downloading image: ', error)
            }
        }
        try {
            const { data, error, status } = await supabase
                .from('MealTemplates')
                .select(`*`)

            if (error && status !== 406) {
                console.log(error)
                throw error
            }

            if (data) {
                setDefaultMeals(data)
                setMeals(data)
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        }
    }, [supabase])
    useEffect(() => {
        getMeals()
    }, [email, supabase])
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-64">

            <div
                className="max-w-sm flex gap-2 items-center justify-center flex-col">
                <button onClick={()=>setShowModal(true)} className="inline-flex transition-all hover:scale-110 cursor-pointer w-fit gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-100 rounded-lg focus:ring-4 focus:outline-none focus:ring-primary-200">

                <h2 className="text-2xl font-bold tracking-tight text-white">Add a meal</h2>
                    <ChefHat className='text-white'/>
                </button>
                <p>or</p>
                <SearchBar meals={defaultMeals} setMeals={setMeals}/>
            </div>
            {meals.length ? meals.map((meal, index) =>
                <MealCard key={index} meal={meal}/>
            ):'No meals'}
            {showModal?<ModalMealTemplate email={email} changeState={setShowModal}/>:''}
        </div>
    );
};

export default MealsGrid;