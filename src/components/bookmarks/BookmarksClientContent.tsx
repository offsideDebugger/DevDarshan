"use client";

import { useBookmarks } from "@/contexts/BookmarkContext";
import { Bookmark, ExternalLink, GitBranch, Trash2 } from "lucide-react";

export default function BookmarksClientContent() {
    const { bookmarkedOrgs, removeBookmark } = useBookmarks();

    if (bookmarkedOrgs.length === 0) {
        return (
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-8 lg:p-12 text-center">
                <Bookmark className="w-12 h-12 lg:w-16 lg:h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">No bookmarks yet</h3>
                <p className="text-gray-400 mb-6 text-sm lg:text-base">Start exploring organizations and bookmark the ones you&apos;re interested in</p>
                <a 
                    href="/dashboard" 
                    className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    Browse Organizations
                </a>
            </div>
        );
    }

    return (
        <div className="bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden">
            <div className="p-4 lg:p-6 border-b border-gray-700">
                <h2 className="text-xl lg:text-2xl font-bold text-white">Bookmarked Organizations</h2>
                <p className="text-gray-400 mt-1 text-sm lg:text-base">Manage your saved organizations</p>
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
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {bookmarkedOrgs.map((org) => (
                            <tr key={org.id} className="hover:bg-gray-800/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-white font-bold text-sm">
                                                {org.orgName.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{org.orgName}</p>
                                            <p className="text-gray-400 text-sm">GSoC 2024</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {org.techStack.split(', ').slice(0, 3).map((tech, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                                {tech}
                                            </span>
                                        ))}
                                        {org.techStack.split(', ').length > 3 && (
                                            <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                                +{org.techStack.split(', ').length - 3}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <GitBranch className="w-4 h-4 text-blue-400 mr-2" />
                                        <span className="text-white font-medium">{org.issues}</span>
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
                                        onClick={() => removeBookmark(org.id)}
                                        className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                                        title="Remove bookmark"
                                    >
                                        <Trash2 className="w-5 h-5" />
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
                    {bookmarkedOrgs.map((org) => (
                        <div key={org.id} className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-300">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                                        <span className="text-white font-bold text-sm">
                                            {org.orgName.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{org.orgName}</p>
                                        <p className="text-gray-400 text-sm">GSoC 2024</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeBookmark(org.id)}
                                    className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                                    title="Remove bookmark"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                <div>
                                    <p className="text-gray-400 text-sm mb-2">Tech Stack</p>
                                    <div className="flex flex-wrap gap-1">
                                        {org.techStack.split(', ').slice(0, 3).map((tech, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                                {tech}
                                            </span>
                                        ))}
                                        {org.techStack.split(', ').length > 3 && (
                                            <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                                +{org.techStack.split(', ').length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <GitBranch className="w-4 h-4 text-blue-400 mr-2" />
                                        <span className="text-white font-medium">{org.issues} issues</span>
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
    );
} 