"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () =>{
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout Successfully')
            router.push('/login')

        } catch (error:any) {
            console.log(error.message);

            toast.error(error.message)
        }

    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
        
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ph-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`} >{data}</Link>}</h2>
            <hr />
            <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            <button onClick={getUserDetails} className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get User Details</button>
        </div>
    )
}