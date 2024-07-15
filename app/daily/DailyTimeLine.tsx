'use client'
import React, {useCallback, useEffect, useState} from 'react';
import {createClient} from "@/src/utils/supabase/client";
import moment from "moment";

const DailyTimeLine = ({email}:{email:string}) => {
    const supabase = createClient()
    const [userMeal, setUserMeal] = useState([])
    const [dailyCalories, setDailyCalories] = useState(0);
    const [dailyProtein, setDailyProtein] = useState(0);
    const [dailyFiber, setDailyFiber] = useState(0);
    const [dailyFat, setDailyFat] = useState(0);
    const getUser = useCallback(async () => {
        try {
            const { data, error } = await supabase.from('Users').select('id').eq('email', email).single()

            if (error) {
                console.log(error)
                throw error
            }

            if (data) {
                // @ts-ignore
                console.log(`User data: `, data.id)
                getUserMeal(data.id)
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
    }}, [])
    const getUserMeal = useCallback(async (userId:string) => {
        try {
            const { data, error } = await supabase.from('UserMeals')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', {ascending: true})
                .filter('created_at', 'gt', new Date().toISOString().split('T')[0])

            if (error) {
                console.log(error)
                throw error
            }

            if (data) {
                // @ts-ignore
                let array = [];
                for (const meal of data) {
                    const date = meal.created_at;
                    const meal_id = meal.id;
                    const templateMeal = await getMealTemplate(meal.template_id)
                    const weight = meal.meal_weight;
                    array.push({...templateMeal,created_at:date,meal_id:meal_id,weight:weight})
                }
                // @ts-ignore
                setUserMeal(array)
                dailyStats(array)
                console.log(`User meal data: `, array)
            }
        } catch (error) {
            alert('Error loading meal data!')
            console.log(error)
        }
    }, [])

    const getMealTemplate = useCallback(async (mealId:string) => {
        try {
            const { data, error } = await supabase.from('MealTemplates').select('*').eq('id', mealId).single()

            if (error) {
                console.log(error)
                throw error
            }

            if (data) {
                // @ts-ignore
                return data;
            }
        } catch (error) {
            alert(`Error loading template data!, id:${mealId}`)
            console.log(error)
        }
    }, [])

    const dailyStats = (array: any[]) =>{
        let calories = 0;
        let protein = 0;
        let fiber = 0;
        let fat = 0;
        array.forEach((meal:any) => {
            if (meal.serving_size){
                calories += (meal.calories/meal.serving_size)*meal.weight;
                protein += (meal.protein/meal.serving_size)*meal.weight;
                fiber += (meal.fiber/meal.serving_size)*meal.weight;
                fat += (meal.fat/meal.serving_size)*meal.weight;

            } else {
                calories += meal.calories;
                protein += meal.protein;
                fiber += meal.fiber;
                fat += meal.fat;

            }
        })
        setDailyCalories(Math.round(calories))
        setDailyProtein(Math.round(protein))
        setDailyFiber(Math.round(fiber))
        setDailyFat(Math.round(fat))
    }

    useEffect(() => {
        getUser()
    }, [email, supabase])

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2>Your daily statistics :</h2>
                <div className="flex gap-4 text-sm">
                    <p>Calories : {dailyCalories}</p>
                    <p>Protein : {dailyProtein}</p>
                    <p>Fiber : {dailyFiber}</p>
                    <p>Fat : {dailyFat}</p>
                </div>
            </div>
            {userMeal.length ?
                <ol className="relative border-s border-gray-200">
                    {userMeal.map((meal: any) => (
                        <li key={meal.meal_id} className="mb-10 ms-4">
                            <div
                                className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 ">{moment(meal.created_at).calendar()}
                            </time>
                            <h3 className="text-lg font-semibold text-gray-900">{meal.meal_name}{meal.weight ? ` (${meal.weight} grams)` : ''}</h3>
                            <p className="mb-4 text-base font-normal text-gray-500">{meal.meal_description}</p>
                            {meal.serving_size ? <p className="font-normal text-gray-700">Per {meal.serving_size} grams :</p> : ''}
                            <div className="flex gap-4 text-sm">
                                <p>Calories : {meal.calories}</p>
                                <p>Protein : {meal.protein}</p>
                                <p>Fiber : {meal.fiber}</p>
                                <p>Fat : {meal.fat}</p>
                            </div>
                        </li>
                    ))}
                </ol> : <p>No meal for today !</p>}


        </div>
    );
};

export default DailyTimeLine;