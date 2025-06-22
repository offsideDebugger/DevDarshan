"use client"; // 👈 Very important
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Avatar from "./avatar"; // your initials-based avatar
import { 
  Bookmark, 
  LogOut, 
  User, 
  ChevronDown,
  CheckCircle
} from "lucide-react";

export default function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();
  
  const initials = session?.user?.name?.split(" ")[0][0] || "";
  const userName = session?.user?.name || "User";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setOpen(false);
    
    try {
      await signOut({ 
        redirect: false,
        callbackUrl: "/"
      });
      
      // Show success message
      setShowLogoutMessage(true);
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push("/");
      }, 1500);
      
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  // Show logout message overlay
  if (showLogoutMessage) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-gray-900/95 border border-purple-500/30 rounded-xl p-8 max-w-sm mx-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Logged Out Successfully</h3>
          </div>
          <p className="text-gray-300 mb-4">
            You have been logged out. Redirecting to home page...
          </p>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }
   
  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200 group"
      >
        <Avatar initials={initials}/>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-gray-900/95 border border-purple-500/30 rounded-xl shadow-2xl backdrop-blur-sm z-50 overflow-hidden">
          {/* User Info Header */}
          <div className="p-4 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <Avatar initials={initials}/>
              <div>
                <p className="text-white font-medium">{userName}</p>
                <p className="text-gray-400 text-sm">{session?.user?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <a
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 transition-all duration-200 group"
              onClick={() => setOpen(false)}
            >
              <User className="w-4 h-4 group-hover:text-purple-400" />
              <span>Profile</span>
            </a>
            
            <a
              href="/bookmarks"
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 transition-all duration-200 group"
              onClick={() => setOpen(false)}
            >
              <Bookmark className="w-4 h-4 group-hover:text-purple-400" />
              <span>Bookmarks</span>
            </a>
            
          
            
            <div className="border-t border-gray-700/50 my-2"></div>
            
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="w-4 h-4 group-hover:text-red-300" />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}