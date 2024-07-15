import React, {useCallback, useEffect, useState} from 'react';
import {createClient} from "@/src/utils/supabase/client";

const ModalMealTemplate = ({changeState,email}:{changeState:(args:boolean)=>void,email:string}) => {
    const supabase = createClient()
    const [isPerMeal, setIsPerMeal] = useState(true)
    const [mealName, setMealName] = useState<string>("");
    const [mealDescription, setMealDescription] = useState<string>("");
    const [mealCalories, setMealCalories] = useState<number>(0);
    const [mealProtein, setMealProtein] = useState<number >(0);
    const [mealFiber, setMealFiber] = useState<number>(0);
    const [mealFat, setMealFat] = useState<number>(0);
    const [mealServingSize, setMealServingSize] = useState<number >(0);
    const [mealWeight, setMealWeight] = useState<number >(0);
    async function insertUserMeal({
        mealTemplateId,
        userId,
        mealWeight
                                  }:{
        mealTemplateId:string
        userId:string
        mealWeight:number|null
    }){
        try {
                try {
                    const { error } = await supabase.from('UserMeals').insert({
                        user_id: userId,
                        template_id: mealTemplateId,
                        meal_weight: mealWeight
                    })
                    if (error) throw error
                } catch (error) {
                    alert('Error updating the data!')
                    console.log(error)
                }
        } catch (error) {
            console.log(error)
        }
    }
    async function insertMealTemplate({
                                          email,
                                          mealName,
                                            mealDescription,
                                            mealCalories,
                                            mealProtein,
                                            mealFiber,
                                            mealFat,
                                            mealServingSize,
                                          mealWeight
                                 }: {
        email: string
        mealName: string | null
        mealDescription: string | null
        mealCalories: number | null
        mealProtein: number | null
        mealFiber: number | null
        mealFat: number | null
        mealServingSize: number | null
        mealWeight: number | null
    }) {
        try {
            const { data, error } = await supabase.from('Users').select('id').eq('email', email).single()
            if (error) throw error
            if (data) {
                const userId = data.id
                try {
                    const { data,error } = await supabase.from('MealTemplates').insert({
                        created_by: userId,
                        meal_name: mealName,
                        meal_description: mealDescription,
                        calories: mealCalories,
                        protein: mealProtein,
                        fiber: mealFiber,
                        fat: mealFat,
                        serving_size: mealServingSize
                    }).select('id').single()
                    if (error) throw error
                    if (data){
                        console.log(`Meal template created: ${data.id}`)
                        await insertUserMeal({
                            mealTemplateId: data.id,
                            userId: userId,
                            mealWeight: mealWeight
                        })
                    }
                } catch (error) {
                    alert('Error updating the data!')
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <dialog
                className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                <div className="bg-white m-auto p-8 rounded">
                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-2xl font-bold">Add a meal</h2>
                        <div className="flex gap-4">
                            <button onClick={() => setIsPerMeal(true)}
                                    className={`px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-primary-100 ${isPerMeal ? 'bg-primary-100' : 'bg-primary-200'}`}>Per
                                meal
                            </button>
                            <button onClick={() => setIsPerMeal(false)}
                                    className={`px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-primary-100 ${!isPerMeal ? 'bg-primary-100' : 'bg-primary-200'}`}>Per
                                ... grams
                            </button>
                        </div>
                        <form className="grid grid-cols-2 gap-4 gap-x-0">
                                <label>Meal name :</label>
                                <input value={mealName}
                                       onChange={(e) => setMealName(e.target.value)} type="text" placeholder="Meal name" required/>
                                <label>Meal description :</label>
                                <textarea value={mealDescription}
                                          onChange={(e) => setMealDescription(e.target.value)} className='h-fit' placeholder="Meal description" required/>
                                <label>Calories :</label>
                                <input value={mealCalories}
                                       onChange={(e) => setMealCalories(e.target.value as unknown as number)} type="number" required/>
                                <label>Protein :</label>
                                <input value={mealProtein}
                                       onChange={(e) => setMealProtein(e.target.value as unknown as number)} type="number" required/>
                                <label>Fiber :</label>
                                <input value={mealFiber}
                                       onChange={(e) => setMealFiber(e.target.value as unknown as number)} type="number" required/>
                                <label>Fat :</label>
                                <input value={mealFat}
                                       onChange={(e) => setMealFat(e.target.value as unknown as number)} type="number" required/>
                            {isPerMeal ? '' :
                                <div className="flex gap-2 flex-col">
                                    <div className="flex gap-2 items-center">

                                        <label>Serving size :</label>
                                        <input value={mealServingSize}
                                               onChange={(e) => setMealServingSize(e.target.value as unknown as number)}
                                               type="number" required/>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <label>Meal weight :</label>
                                        <input value={mealWeight}
                                               onChange={(e) => setMealWeight(e.target.value as unknown as number)}
                                               type="number" required/>
                                    </div>
                                </div>
                            }
                            <div className="flex gap-4">
                                <button onClick={() => changeState(false)}
                                        className="bg-primary-200 text-white rounded-lg px-3 py-2">Cancel
                                </button>
                                <button onClick={() => insertMealTemplate({
                                    email,
                                    mealName,
                                    mealDescription,
                                    mealCalories,
                                    mealProtein,
                                    mealFiber,
                                    mealFat,
                                    mealServingSize,
                                mealWeight})} className="bg-primary-100 text-white rounded-lg px-3 py-2">Add meal</button>
                            </div>
                        </form>
                    </div>

                </div>
            </dialog>
        </>
    );
};

export default ModalMealTemplate;