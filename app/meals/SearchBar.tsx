import React from 'react';

const SearchBar = ({meals,setMeals}:{meals:object[],setMeals:object}) => {
    return (
        <form className="flex flex-col pb-16">
            <label htmlFor='searchBar' className='font-semibold text-xl text-neutral-200'>Search a meal</label>
            <input onChange={(e)=>{
                const search = e.target.value.toLowerCase()
                const filteredMeals = meals.filter((meal: any) =>
                    meal.meal_name.toLowerCase().includes(search) ||
                    meal.meal_description.toLowerCase().includes(search)
                );
                // @ts-ignore
                setMeals(filteredMeals)

            }} type='text' id='searchBar' name='searchBar' placeholder="Chocolate bar..."
            className='py-2 px-4 bg-primary-100 text-white placeholder-white rounded-md'/>
        </form>
    );
};

export default SearchBar;