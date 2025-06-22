"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Organization {
  id: number;
  orgName: string;
  techStack: string;
  issues: number;
  githubRepo: string;
  isBookmarked: boolean;
}

interface BookmarkContextType {
  organizations: Organization[];
  bookmarkedOrgs: Organization[];
  toggleBookmark: (orgId: number) => void;
  removeBookmark: (orgId: number) => void;
  isBookmarked: (orgId: number) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

// Sample data - replace with actual API call
const initialOrganizations: Organization[] = [
  {
    id: 1,
    orgName: "Mozilla",
    techStack: "Rust, JavaScript, Python, C++",
    issues: 45,
    githubRepo: "https://github.com/mozilla",
    isBookmarked: false
  },
  {
    id: 2,
    orgName: "Apache Software Foundation",
    techStack: "Java, Python, C++, JavaScript",
    issues: 32,
    githubRepo: "https://github.com/apache",
    isBookmarked: true
  },
  {
    id: 3,
    orgName: "Linux Foundation",
    techStack: "C, Python, Shell, Go",
    issues: 28,
    githubRepo: "https://github.com/linuxfoundation",
    isBookmarked: false
  },
  {
    id: 4,
    orgName: "Eclipse Foundation",
    techStack: "Java, JavaScript, TypeScript",
    issues: 19,
    githubRepo: "https://github.com/eclipse",
    isBookmarked: false
  },
  {
    id: 5,
    orgName: "Google",
    techStack: "Go, Python, Java, C++",
    issues: 67,
    githubRepo: "https://github.com/google",
    isBookmarked: true
  },
  {
    id: 6,
    orgName: "Microsoft",
    techStack: "C#, TypeScript, Python, C++",
    issues: 41,
    githubRepo: "https://github.com/microsoft",
    isBookmarked: true
  }
];

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('gsoc-bookmarks');
    if (savedBookmarks) {
      const bookmarkedIds = JSON.parse(savedBookmarks);
      setOrganizations(prevOrgs => 
        prevOrgs.map(org => ({
          ...org,
          isBookmarked: bookmarkedIds.includes(org.id)
        }))
      );
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    const bookmarkedIds = organizations
      .filter(org => org.isBookmarked)
      .map(org => org.id);
    localStorage.setItem('gsoc-bookmarks', JSON.stringify(bookmarkedIds));
  }, [organizations]);

  const bookmarkedOrgs = organizations.filter(org => org.isBookmarked);

  const toggleBookmark = (orgId: number) => {
    setOrganizations(prevOrgs => 
      prevOrgs.map(org => 
        org.id === orgId 
          ? { ...org, isBookmarked: !org.isBookmarked }
          : org
      )
    );
  };

  const removeBookmark = (orgId: number) => {
    setOrganizations(prevOrgs => 
      prevOrgs.map(org => 
        org.id === orgId 
          ? { ...org, isBookmarked: false }
          : org
      )
    );
  };

  const isBookmarked = (orgId: number) => {
    return organizations.find(org => org.id === orgId)?.isBookmarked || false;
  };

  return (
    <BookmarkContext.Provider value={{
      organizations,
      bookmarkedOrgs,
      toggleBookmark,
      removeBookmark,
      isBookmarked
    }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
} 