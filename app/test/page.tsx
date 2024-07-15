import React from 'react';
import {addUser, createMealTemplate, createUserMeal} from "./action";

const Page = () => {
    return (
        <div>
            <form>
                <legend>Add User</legend>
                <button formAction={createUserMeal}>Add</button>
            </form>
        </div>
    );
};

export default Page;