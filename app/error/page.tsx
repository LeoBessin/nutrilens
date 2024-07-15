import Link from "next/link";

export default function ErrorPage() {
    return <>
        <p>Sorry, something went wrong</p>
        <Link href="/" className="font-bold">Return to home page</Link>
    </>
}