import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import AppHeader from "@/components/layout/AppHeader";
import BookmarksClientContent from "@/components/bookmarks/BookmarksClientContent";

export default async function BookmarksPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <AppHeader />
            
            <main className="p-4 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                Your Bookmarks
                            </h1>
                            <p className="text-gray-400 mt-2 text-sm lg:text-base">Organizations you&apos;ve saved for later</p>
                        </div>
                    </div>

                    <BookmarksClientContent />
                </div>
            </main>
        </div>
    );
}