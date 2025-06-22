"use client"

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function MessageBanner() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Handle verification error messages
    const error = searchParams.get("error");
    if (error === "token-expired") {
      setErrorMessage("Verification link has expired. Please register again to get a new verification email.");
    } else if (error === "verification-failed") {
      setErrorMessage("Email verification failed. Please try again or contact support.");
    } else if (error === "invalid-token") {
      setErrorMessage("Invalid verification link. Please check your email and try again.");
    }
  }, [searchParams]);

  if (!errorMessage && !successMessage) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full">
      {errorMessage && (
        <div className="bg-red-900/90 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-sm">{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div className="bg-green-900/90 border border-green-500 text-green-100 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-sm">{successMessage}</span>
        </div>
      )}
    </div>
  );
} 