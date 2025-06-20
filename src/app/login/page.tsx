"use client"
import { BackgroundGradient } from "@/components/cardGradient";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
export default function Login() {
    const router=useRouter();
    const [error,setError]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const res=await signIn("credentials",{
            email,
            password,
            redirect:false,
            callbackUrl:"/dashboard"
        })
        if(res?.error){
            setError(res.error)
        }
        else{
            router.push("/dashboard")
        }
    }
    return (
        <div className="flex h-screen w-screen justify-center items-center " >
            <BackgroundGradient>
            <div className="w-[350] bg-zinc-900 p-10 rounded-3xl h-[380px]">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email:</label>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="joe777@abc.com" required />
                </div>
                <div className="mb-5">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password:</label>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 pt-4 dark:focus:border-blue-500" placeholder="*********" required />
                </div>
                <div className="flex justify-center mt-8 ml-2">
                    <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-15 py-4 text-center me-2 mb-2 cursor-pointer">Login</button>
                    {error && <p className="text-white">{error}</p>}
                </div>
                
            </form>
            <div className="flex justify-center mt-4 ml-2">
                    <p className="text-white">Don't have an account ? </p>
                    <Link href="/signup" className="text-white hover:text-gray-400"><p className="ml-2"> SIGN UP</p></Link>
                </div>
            </div>
            </BackgroundGradient>
        </div>       
      
    );
}