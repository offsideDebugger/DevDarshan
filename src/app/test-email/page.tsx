"use client"

import { useState } from "react"
import axios from "axios"
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function TestEmailPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState("")
    const [testResult, setTestResult] = useState<string | null>(null)

    const testEmail = async () => {
        if (!email) {
            setStatus('error')
            setMessage("Please enter an email address")
            return
        }

        setIsLoading(true)
        setStatus('idle')
        setMessage("")
        
        try {
            const res = await axios.post("http://localhost:3000/api/test-email", {
                email
            })
            
            setStatus('success')
            setMessage("Test email sent successfully!")
            setTestResult(res.data)
        } catch (error) {
            console.log(error)
            setStatus('error')
            if ((error as any).response?.data?.error) {
                setMessage((error as any).response.data.error)
            } else if ((error as any).message) {
                setMessage((error as any).message)
            } else {
                setMessage("Failed to send test email")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const manualVerify = async () => {
        if (!email) {
            setStatus('error')
            setMessage("Please enter an email address")
            return
        }

        setIsLoading(true)
        setStatus('idle')
        setMessage("")
        
        try {
            const res = await axios.post("http://localhost:3000/api/manual-verify", {
                email
            })
            
            setStatus('success')
            setMessage("Account verified successfully!")
            setTestResult(res.data)
        } catch (error) {
            console.log(error)
            setStatus('error')
            if ((error as any).response?.data?.error) {
                setMessage((error as any).response.data.error)
            } else if ((error as any).message) {
                setMessage((error as any).message)
            } else {
                setMessage("Failed to verify account")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-white mb-6 text-center">
                    📧 Email Testing Tool
                </h1>
                
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.currentTarget.value)}
                        placeholder="test@example.com"
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Status Message */}
                {status !== 'idle' && (
                    <div className={`mb-6 p-4 rounded-lg border ${
                        status === 'success' ? 'bg-green-900/20 border-green-500/30' :
                        'bg-red-900/20 border-red-500/30'
                    }`}>
                        <div className="flex items-center gap-2">
                            {status === 'success' ? 
                                <CheckCircle className="w-5 h-5 text-green-500" /> :
                                <AlertCircle className="w-5 h-5 text-red-500" />
                            }
                            <p className={`text-sm ${
                                status === 'success' ? 'text-green-400' : 'text-red-400'
                            }`}>
                                {message}
                            </p>
                        </div>
                    </div>
                )}

                {/* Test Results */}
                {testResult && (
                    <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                        <h3 className="text-white font-semibold mb-2">Test Results:</h3>
                        <pre className="text-xs text-gray-300 overflow-x-auto">
                            {JSON.stringify(testResult, null, 2)}
                        </pre>
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={testEmail}
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending Test Email...
                            </>
                        ) : (
                            <>
                                <Mail className="w-4 h-4" />
                                Send Test Email
                            </>
                        )}
                    </button>

                    <button
                        onClick={manualVerify}
                        disabled={isLoading}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                Manual Verify Account
                            </>
                        )}
                    </button>
                </div>

                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">📋 Troubleshooting Tips:</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Check spam/junk folder</li>
                        <li>• Try different email providers</li>
                        <li>• Check Resend dashboard</li>
                        <li>• Use manual verification for testing</li>
                    </ul>
                </div>
            </div>
        </div>
    )
} 