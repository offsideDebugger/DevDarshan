import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import AppHeader from "@/components/layout/AppHeader";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <AppHeader />
            
            <main className="p-4 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Profile Settings
                    </h1>
                    
                    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 lg:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 mb-6 lg:mb-8">
                            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4 lg:mb-0">
                                <span className="text-white font-bold text-xl lg:text-2xl">
                                    {session?.user?.name?.charAt(0) || "U"}
                                </span>
                            </div>
                            <div className="text-center lg:text-left">
                                <h2 className="text-xl lg:text-2xl font-semibold text-white">{session?.user?.name}</h2>
                                <p className="text-gray-400 text-sm lg:text-base">{session?.user?.email}</p>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="border-b border-gray-700 pb-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                                        <p className="text-white text-sm lg:text-base">{session?.user?.name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                        <p className="text-white text-sm lg:text-base break-all">{session?.user?.email}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border-b border-gray-700 pb-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Account Status</h3>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-green-400 text-sm lg:text-base">Email Verified</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}