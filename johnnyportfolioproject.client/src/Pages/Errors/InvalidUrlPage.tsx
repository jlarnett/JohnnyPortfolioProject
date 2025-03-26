import { Link } from "react-router";


export default function InvalidUrlPage() {
    return <div className="text-red-400">Ooops! You Tried to Access an Invalid URL, Click <Link to='/' className="font-bold text-xl text-green-500">Here</Link> to return to home page
    </div>;
}