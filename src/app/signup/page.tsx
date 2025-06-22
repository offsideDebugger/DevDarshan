"use client"

import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { BackgroundGradient } from "@/components/cardGradient"
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function (){
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [isLoading, setIsLoading]=useState(false)
    const [status, setStatus]=useState<'idle' | 'success' | 'error' | 'email-sent'>('idle')
    const [message, setMessage]=useState("")
    
    async function Handler(){
        if (!username || !email || !password) {
            setStatus('error')
            setMessage("Please fill in all fields")
            return
        }

        setIsLoading(true)
        setStatus('idle')
        setMessage("")
        
        try{
            const res=await axios.post("http://localhost:3000/api/auth/signup",{
                username,
                email,
                password
            })
            
            if(res.data.requiresVerification){
                setStatus('email-sent')
                setMessage("Registration successful! Please check your email to verify your account.")
            } else if(res.data.redirect){
                window.location.href=res.data.redirect
            } else {
                setStatus('success')
                setMessage(res.data.message || "Registration successful!")
            }
        }catch(e: any){
            console.log(e)
            setStatus('error')
            if (e.response?.data?.error) {
                setMessage(e.response.data.error)
            } else if (e.message) {
                setMessage(e.message)
            } else {
                setMessage("Registration failed. Please try again.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const getStatusIcon = () => {
        switch (status) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-500" />
            case 'email-sent':
                return <Mail className="w-5 h-5 text-blue-500" />
            default:
                return null
        }
    }

    const getStatusColor = () => {
        switch (status) {
            case 'success':
                return 'text-green-400'
            case 'error':
                return 'text-red-400'
            case 'email-sent':
                return 'text-blue-400'
            default:
                return 'text-gray-400'
        }
    }

    return <div className="flex justify-center items-center h-screen p-4">
        <BackgroundGradient>
        <div className="w-full max-w-[350px] min-h-[580px] p-4 lg:p-6 bg-zinc-900 rounded-3xl shadow">
            <h1 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8 text-white dark:text-white">Register</h1>
            
            {/* Status Message */}
            {status !== 'idle' && (
                <div className={`mb-6 p-3 lg:p-4 rounded-lg border ${
                    status === 'success' ? 'bg-green-900/20 border-green-500/30' :
                    status === 'error' ? 'bg-red-900/20 border-red-500/30' :
                    'bg-blue-900/20 border-blue-500/30'
                }`}>
                    <div className="flex items-center gap-2">
                        {getStatusIcon()}
                        <p className={`text-sm ${getStatusColor()}`}>{message}</p>
                    </div>
                    
                    {status === 'email-sent' && (
                        <div className="mt-3 text-xs text-gray-400">
                            <p>📧 Check your spam folder if you don't see the email</p>
                            <p>⏰ Verification link expires in 1 hour</p>
                        </div>
                    )}
                </div>
            )}

            <div className="mb-4 lg:mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
                <input 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.currentTarget.value)} 
                    type="text" 
                    name="username" 
                    disabled={isLoading}
                    className="block w-full p-3 lg:p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm lg:text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50" 
                    placeholder="jsmith"
                />
            </div>
            <div className="mb-4 lg:mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                <input 
                    type="email" 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.currentTarget.value)} 
                    name="email" 
                    disabled={isLoading}
                    className="block w-full p-3 lg:p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm lg:text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50" 
                    placeholder="jsmith@abc.com"
                />
            </div>
            <div className="mb-4 lg:mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                <input 
                    type="password" 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.currentTarget.value)} 
                    name="password" 
                    disabled={isLoading}
                    className="block w-full p-3 lg:p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm lg:text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50" 
                    placeholder="****"
                />
            </div>
            <div className="flex justify-center mt-6 lg:mt-8">
                <button 
                    type="submit"
                    onClick={Handler} 
                    disabled={isLoading}
                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-8 lg:px-15 py-3 lg:py-4 text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 w-full lg:w-auto"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Registering...
                        </>
                    ) : (
                        'Register'
                    )}
                </button>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center mt-4 lg:mt-6 space-y-2 lg:space-y-0 lg:space-x-2">
                <p className="text-white text-sm lg:text-base">Already have an account ?</p>
                <Link href="/login" className="text-white hover:text-gray-400">
                    <p className="text-sm lg:text-base font-medium">LOGIN</p>
                </Link>
            </div>
        </div>
        </BackgroundGradient>
    </div>
}