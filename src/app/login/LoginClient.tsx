"use client"
import { BackgroundGradient } from "@/components/cardGradient";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function LoginClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // Show success message if user just verified email
        if (searchParams.get("verified") === "true") {
            setSuccessMessage("Email verified successfully! You can now log in.");
        }
        // Show error message if verification failed
        if (searchParams.get("error") === "token-expired") {
            setSuccessMessage("Verification link has expired. Please register again.");
        }
        if (searchParams.get("error") === "verification-failed") {
            setSuccessMessage("Email verification failed. Please try again.");
        }
        if (searchParams.get("error") === "unverified") {
            setSuccessMessage("Please verify your email before accessing this page. Check your inbox for the verification link.");
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: "/dashboard"
            });
            if (res?.error) {
                if (res.error.includes("verify your email")) {
                    setSuccessMessage("Please verify your email before logging in. Check your inbox for the verification link.");
                } else {
                    setSuccessMessage(res.error);
                }
            } else if (res?.ok) {
                router.push("/dashboard");
            }
        } catch {
            setSuccessMessage("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-screen justify-center items-center p-4">
            <BackgroundGradient>
                <div className="w-full max-w-[350px] bg-zinc-900 p-6 lg:p-10 rounded-3xl min-h-[440px]">
                    <h1 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8 text-white dark:text-white">Login</h1>
                    {successMessage && (
                        <div className="bg-green-500/20 border border-green-500 text-green-400 px-3 lg:px-4 py-3 rounded-lg mb-4 text-sm">
                            {successMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                        <div className="mb-4 lg:mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email:</label>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="joe777@abc.com"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-4 lg:mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password:</label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="*********"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="flex justify-center mt-6 lg:mt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 lg:px-8 py-3 lg:py-4 text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full lg:w-auto"
                            >
                                {loading ? "Signing in..." : "Login"}
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-col lg:flex-row justify-center items-center mt-4 lg:mt-6 space-y-2 lg:space-y-0 lg:space-x-2">
                        <p className="text-white text-sm lg:text-base">Don&apos;t have an account?</p>
                        <Link href="/signup" className="text-white hover:text-gray-400">
                            <p className="text-sm lg:text-base font-medium">SIGN UP</p>
                        </Link>
                    </div>
                </div>
            </BackgroundGradient>
        </div>
    );
} 