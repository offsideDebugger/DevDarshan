"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AvatarDropdown from "@/components/dashboardComps/AvatarDropdown";
import { Menu, X } from "lucide-react";

const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/bookmarks', label: 'Bookmarks' },
    { href: '/profile', label: 'Profile' }
];

export default function AppHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* Header */}
            <header className="h-[50px] flex items-center justify-between bg-gray-900/50 border-b border-gray-800 backdrop-blur-sm px-4 lg:px-8 sticky top-0 z-30">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">DD</span>
                    </div>
                    <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        DevDarshan
                    </span>
                </div>
                
                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-gray-300 hover:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-4">
                    <nav className="flex items-center space-x-6">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href}>
                                <span className={`transition-colors duration-200 ${pathname === link.href ? 'text-purple-400 font-medium' : 'text-gray-300 hover:text-white'}`}>
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </nav>
                    <AvatarDropdown />
                </div>
            </header>

            {/* Mobile Navigation Menu */}
            <div className={`fixed top-0 left-0 w-64 h-full bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 transform transition-transform duration-300 z-50 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-[50px] flex items-center justify-between px-4 border-b border-gray-800">
                    <span className="text-lg font-semibold text-white">Menu</span>
                    <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-300 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <nav className="flex flex-col p-6 space-y-4">
                    {navLinks.map(link => (
                         <Link key={link.href} href={link.href}>
                            <span 
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block py-2 px-4 rounded-lg ${pathname === link.href ? 'text-purple-400 font-medium bg-purple-500/10' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'}`}
                            >
                                {link.label}
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
} 