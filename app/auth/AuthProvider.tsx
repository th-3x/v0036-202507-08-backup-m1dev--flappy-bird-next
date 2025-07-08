'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type User = {
  id: string
  name: string
  email: string
  highScore: number
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateHighScore: (score: number) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('flappyUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, you would validate credentials against a backend
    // For this demo, we'll simulate a successful login
    setLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockUser = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      highScore: 0
    }
    
    setUser(mockUser)
    localStorage.setItem('flappyUser', JSON.stringify(mockUser))
    setLoading(false)
  }

  const register = async (name: string, email: string, password: string) => {
    // In a real app, you would register the user in a backend
    setLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newUser = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      highScore: 0
    }
    
    setUser(newUser)
    localStorage.setItem('flappyUser', JSON.stringify(newUser))
    setLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('flappyUser')
  }

  const updateHighScore = (score: number) => {
    if (user && score > user.highScore) {
      const updatedUser = { ...user, highScore: score }
      setUser(updatedUser)
      localStorage.setItem('flappyUser', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateHighScore, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
