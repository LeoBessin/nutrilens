import { login } from './actions'
import Link from "next/link";

export default  function LoginPage() {
    return (
            <form className="flex flex-col">
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required/>
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required/>
                <Link href="/register">Do not have an account? Click here to sign up.</Link>
                <button formAction={login}>Log in</button>
            </form>
    )
}