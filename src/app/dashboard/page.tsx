import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import AppHeader from "@/components/layout/AppHeader";
import DashboardClientContent from "@/components/dashboard/DashboardClientContent";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    return (
        <div className="min-h-screen bg-black text-white">
            <AppHeader />
            
            <main className="p-4 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Welcome back, {session?.user?.name}!
                    </h1>
                    
                    <DashboardClientContent />
                </div>
            </main>
        </div>
    );
}