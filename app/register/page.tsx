import { signup } from './actions'
import Link from "next/link";

export default function LoginPage() {
    return (
        <form className='flex flex-col'>
            <label htmlFor="username">Username:</label>
            <input id="username" name="username" type="text" required/>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required/>
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required/>
            <Link href="/login">Do you already have an account? Click here to log in.</Link>
            <button formAction={signup}>Sign up</button>
        </form>
    )
}