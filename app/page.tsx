'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './auth/AuthProvider'
import Link from 'next/link'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (!loading && user) {
      router.push('/game')
    }
  }, [user, loading, router])
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-game-blue p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center mb-2">Flappy Bird</h1>
          <p className="text-center text-gray-600 mb-8">A modern remake with Next.js and Tailwind CSS</p>
          
          <div className="flex flex-col space-y-4">
            <Link 
              href="/auth/login"
              className="w-full py-3 px-6 bg-indigo-600 text-white font-medium rounded-lg text-center hover:bg-indigo-700 transition-colors"
            >
              Login
            </Link>
            
            <Link 
              href="/auth/register"
              className="w-full py-3 px-6 bg-green-500 text-white font-medium rounded-lg text-center hover:bg-green-600 transition-colors"
            >
              Register
            </Link>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Login or register to play and save your high scores!
            </p>
          </div>
        </div>
        
        <div className="bg-gray-100 px-8 py-4">
          <h2 className="font-bold mb-2">How to Play:</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Click or press Space to make the bird fly</li>
            <li>Navigate through the pipes</li>
            <li>Each pipe passed gives you 1 point</li>
            <li>Try to beat your high score!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
