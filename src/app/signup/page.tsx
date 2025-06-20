"use client"

import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { BackgroundGradient } from "@/components/cardGradient"

export default function (){
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    
    async function Handler(){
        try{
            const res=await axios.post("http://localhost:3000/api/auth/signup",{
            username,
            email,
            password
        })
        if(res.data.redirect){
            window.location.href=res.data.redirect
        }
        }catch(e){
            console.log(e)
        }
       
    }

    return <div className="flex justify-center items-center h-screen">
        <BackgroundGradient>
        <div className="w-[350px] h-[500px] p-4 bg-zinc-900 rounded-3xl shadow sm:p-6 md:p-8 ">
      
            <div className="mb-6">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
                <input onChange={(e)=>setUsername(e.target.value)} type="text" name="username" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="jsmith"/>
            </div>
            <div className="mb-6">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                <input type="text" onChange={(e)=>setEmail(e.target.value)} name="email" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="jsmith@abc.com"/>
            </div>
            <div className="mb-6">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="****"/>
            </div>
            <div className="flex justify-center ml-2 mt-8">
                <button type="submit"onClick={Handler} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-15 py-4 text-center me-2 mb-2 cursor-pointer">Register</button>
            </div>
            <div className="flex justify-center mt-2 ml-2">
                <p className="text-white">Already have an account ?</p>
                <Link href="/login" className="text-white hover:text-gray-400"><p className="ml-2"> LOGIN</p></Link>
            </div>
        </div>
        </BackgroundGradient>
    </div>
}