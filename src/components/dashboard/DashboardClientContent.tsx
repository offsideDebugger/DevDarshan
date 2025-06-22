"use client";

import { useBookmarks } from "@/contexts/BookmarkContext";
import { Bookmark, ExternalLink, GitBranch } from "lucide-react";
import gsocOrganizations from "@/lib/gsocOrgs";
import { useState, useMemo } from "react";

export default function DashboardClientContent() {
    const { bookmarkedOrgs, toggleBookmark, isBookmarked } = useBookmarks();
    const organizations = gsocOrganizations;
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
    const [techSearch, setTechSearch] = useState("");

    // Get all unique techs from orgs
    const allTechs = useMemo(() => {
        const techSet = new Set<string>();
        organizations.forEach(org => org.techStack.forEach(tech => techSet.add(tech)));
        return Array.from(techSet).sort();
    }, [organizations]);

    // Filter orgs by selected techs
    const filteredOrgs = useMemo(() => {
        if (selectedTechs.length === 0) return organizations;
        return organizations.filter(org =>
            org.techStack.some(tech => selectedTechs.includes(tech))
        );
    }, [organizations, selectedTechs]);

    // Filter orgs by tech stack search
    const filteredOrgsBySearch = useMemo(() => {
        if (!techSearch.trim()) return organizations;
        const search = techSearch.trim().toLowerCase();
        return organizations.filter(org =>
            org.techStack.some(tech => tech.toLowerCase().includes(search))
        );
    }, [organizations, techSearch]);

    // Handle select change
    function handleTechChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
        setSelectedTechs(options);
    }

    // Helper to parse openIssues string like '1,200+' to a number
    function parseOpenIssues(openIssues: string): number {
        const num = parseInt(openIssues.replace(/[^\d]/g, ""));
        return isNaN(num) ? 0 : num;
    }

    return (
        <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 lg:p-6 hover:border-purple-500/50 transition-all duration-300">
                    <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">Your Bookmarks</h3>
                    <p className="text-2xl lg:text-3xl font-bold text-purple-400">{bookmarkedOrgs.length}</p>
                    <p className="text-gray-400 text-sm">Saved organizations</p>
                </div>
                
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 lg:p-6 hover:border-purple-500/50 transition-all duration-300">
                    <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">Available Issues</h3>
                    <p className="text-2xl lg:text-3xl font-bold text-blue-400">{organizations.reduce((sum, org) => sum + parseOpenIssues(org.openIssues), 0)}</p>
                    <p className="text-gray-400 text-sm">Open issues to work on</p>
                </div>
                
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 lg:p-6 hover:border-purple-500/50 transition-all duration-300">
                    <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">Organizations</h3>
                    <p className="text-2xl lg:text-3xl font-bold text-green-400">{organizations.length}</p>
                    <p className="text-gray-400 text-sm">Participating orgs</p>
                </div>
            </div>

            {/* Tech Stack Search Bar */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <label htmlFor="tech-search" className="text-gray-300 text-sm font-medium">Search Tech Stack:</label>
                <input
                    id="tech-search"
                    type="text"
                    value={techSearch}
                    onChange={e => setTechSearch(e.target.value)}
                    placeholder="e.g. Python, JavaScript, Go..."
                    className="w-full sm:w-64 p-2 rounded bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {techSearch && (
                    <button
                        className="text-xs text-purple-400 hover:underline ml-1"
                        onClick={() => setTechSearch("")}
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Organizations Section */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden">
                <div className="p-4 lg:p-6 border-b border-gray-700">
                    <h2 className="text-xl lg:text-2xl font-bold text-white">GSoC Organizations</h2>
                    <p className="text-gray-400 mt-1 text-sm lg:text-base">Browse and bookmark organizations you're interested in</p>
                </div>
                
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Organization</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tech Stack</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Open Issues</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">GitHub Repo</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Bookmark</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredOrgsBySearch.map((org) => (
                                <tr key={org.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                                                <span className="text-white font-bold text-sm">
                                                    {org.organization.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{org.organization}</p>
                                                <p className="text-gray-400 text-sm">GSoC 2024</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {org.techStack.slice(0, 3).map((tech, index) => (
                                                <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                            {org.techStack.length > 3 && (
                                                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                                    +{org.techStack.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <GitBranch className="w-4 h-4 text-blue-400 mr-2" />
                                            <span className="text-white font-medium">{org.openIssues}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a 
                                            href={org.githubRepo} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            View Repo
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => toggleBookmark(org.id)}
                                            className={`p-2 rounded-lg transition-all duration-200 ${
                                                isBookmarked(org.id) 
                                                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                                                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                                            }`}
                                        >
                                            <Bookmark className={`w-5 h-5 ${isBookmarked(org.id) ? 'fill-current' : ''}`} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden">
                    <div className="p-4 space-y-4">
                        {filteredOrgsBySearch.map((org) => (
                            <div key={org.id} className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-300">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-white font-bold text-sm">
                                                {org.organization.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{org.organization}</p>
                                            <p className="text-gray-400 text-sm">GSoC 2024</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleBookmark(org.id)}
                                        className={`p-2 rounded-lg transition-all duration-200 ${
                                            isBookmarked(org.id) 
                                                ? 'bg-purple-600 text-white hover:bg-purple-700' 
                                                : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                                        }`}
                                    >
                                        <Bookmark className={`w-5 h-5 ${isBookmarked(org.id) ? 'fill-current' : ''}`} />
                                    </button>
                                </div>
                                
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-gray-400 text-sm mb-2">Tech Stack</p>
                                        <div className="flex flex-wrap gap-1">
                                            {org.techStack.slice(0, 3).map((tech, index) => (
                                                <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                            {org.techStack.length > 3 && (
                                                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                                    +{org.techStack.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <GitBranch className="w-4 h-4 text-blue-400 mr-2" />
                                            <span className="text-white font-medium">{org.openIssues} issues</span>
                                        </div>
                                        <a 
                                            href={org.githubRepo} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-1" />
                                            View Repo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
} 