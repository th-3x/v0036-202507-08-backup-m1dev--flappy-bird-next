'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../auth/AuthProvider'
import Bird from './components/Bird'
import Pipe from './components/Pipe'
import GameOver from './components/GameOver'

// Game constants
const GRAVITY = 0.6
const JUMP_FORCE = -10
const PIPE_WIDTH = 80
const PIPE_GAP = 200
const PIPE_SPEED = 3
const BIRD_WIDTH = 60
const BIRD_HEIGHT = 45

export default function Game() {
  const { user, updateHighScore, logout } = useAuth()
  const router = useRouter()
  const gameContainerRef = useRef<HTMLDivElement>(null)
  
  const [gameSize, setGameSize] = useState({ width: 400, height: 600 })
  const [birdPosition, setBirdPosition] = useState(250)
  const [birdVelocity, setBirdVelocity] = useState(0)
  const [birdRotation, setBirdRotation] = useState(0)
  const [pipes, setPipes] = useState<Array<{ x: number, topHeight: number, passed: boolean }>>([])
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])
  
  // Set up game container size
  useEffect(() => {
    if (gameContainerRef.current) {
      const updateSize = () => {
        const width = Math.min(window.innerWidth - 40, 500)
        const height = Math.min(window.innerHeight - 200, 700)
        setGameSize({ width, height })
      }
      
      updateSize()
      window.addEventListener('resize', updateSize)
      return () => window.removeEventListener('resize', updateSize)
    }
  }, [])
  
  // Game loop
  useEffect(() => {
    if (!isPlaying) return
    
    const gameLoop = setInterval(() => {
      // Update bird position
      setBirdPosition(prev => {
        const newPosition = prev + birdVelocity
        
        // Check if bird hits the ground or ceiling
        if (newPosition >= gameSize.height - BIRD_HEIGHT - 80 || newPosition <= 0) {
          endGame()
          return prev
        }
        
        return newPosition
      })
      
      // Update bird velocity (gravity)
      setBirdVelocity(prev => prev + GRAVITY)
      
      // Update bird rotation based on velocity
      setBirdRotation(Math.min(Math.max(birdVelocity * 3, -30), 90))
      
      // Move pipes
      setPipes(prevPipes => {
        return prevPipes.map(pipe => {
          // Check if bird passed the pipe
          if (!pipe.passed && pipe.x + PIPE_WIDTH < 60) {
            setScore(prev => prev + 1)
            return { ...pipe, x: pipe.x - PIPE_SPEED, passed: true }
          }
          
          return { ...pipe, x: pipe.x - PIPE_SPEED }
        }).filter(pipe => pipe.x + PIPE_WIDTH > 0)
      })
      
      // Generate new pipes
      if (pipes.length === 0 || pipes[pipes.length - 1].x < gameSize.width - 250) {
        addPipe()
      }
      
      // Check for collisions
      checkCollisions()
      
    }, 20)
    
    return () => clearInterval(gameLoop)
  }, [isPlaying, birdPosition, birdVelocity, pipes, gameSize])
  
  // Add new pipe
  const addPipe = useCallback(() => {
    const topHeight = Math.floor(Math.random() * (gameSize.height - PIPE_GAP - 200)) + 80
    setPipes(prev => [...prev, { 
      x: gameSize.width, 
      topHeight, 
      passed: false 
    }])
  }, [gameSize.height])
  
  // Check for collisions
  const checkCollisions = useCallback(() => {
    // Bird's hitbox (slightly smaller than visual for better gameplay)
    const birdLeft = 60 + 5
    const birdRight = birdLeft + BIRD_WIDTH - 10
    const birdTop = birdPosition + 5
    const birdBottom = birdPosition + BIRD_HEIGHT - 5
    
    // Check each pipe
    for (const pipe of pipes) {
      const pipeLeft = pipe.x + 5
      const pipeRight = pipe.x + PIPE_WIDTH - 5
      
      // If bird is within pipe's x-range
      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        // Check if bird hits top pipe
        if (birdTop < pipe.topHeight) {
          endGame()
          return
        }
        
        // Check if bird hits bottom pipe
        if (birdBottom > pipe.topHeight + PIPE_GAP) {
          endGame()
          return
        }
      }
    }
  }, [birdPosition, pipes])
  
  // Handle jump
  const handleJump = useCallback(() => {
    if (!isPlaying) {
      startGame()
      return
    }
    
    setBirdVelocity(JUMP_FORCE)
  }, [isPlaying])
  
  // Start game
  const startGame = () => {
    setIsPlaying(true)
    setGameOver(false)
    setBirdPosition(250)
    setBirdVelocity(0)
    setBirdRotation(0)
    setPipes([])
    setScore(0)
  }
  
  // End game
  const endGame = () => {
    setIsPlaying(false)
    setGameOver(true)
    
    // Update high score if needed
    if (user && score > (user.highScore || 0)) {
      updateHighScore(score)
    }
  }
  
  // Handle key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent page scrolling
        handleJump()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleJump])
  
  if (!user) {
    return null // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-lg mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Flappy Bird</h1>
          <p>Welcome, {user.name}!</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-bold">High Score: {user.highScore || 0}</p>
            <p>Current: {score}</p>
          </div>
          
          <button 
            onClick={() => logout()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
      
      <div 
        ref={gameContainerRef}
        className="game-container relative"
        style={{ width: gameSize.width, height: gameSize.height }}
        onClick={handleJump}
      >
        {/* Sky background */}
        <div className="absolute inset-0 bg-game-blue"></div>
        
        {/* Ground */}
        <div 
          className="absolute bottom-0 w-full bg-game-green border-t-4 border-black"
          style={{ height: '80px' }}
        ></div>
        
        {/* Bird */}
        <Bird position={birdPosition} rotation={birdRotation} />
        
        {/* Pipes */}
        {pipes.map((pipe, index) => (
          <div key={index}>
            <Pipe 
              position={{ x: pipe.x, y: 0 }} 
              height={pipe.topHeight} 
              isTop={true} 
            />
            <Pipe 
              position={{ x: pipe.x, y: pipe.topHeight + PIPE_GAP }} 
              height={gameSize.height - pipe.topHeight - PIPE_GAP - 80} 
              isTop={false} 
            />
          </div>
        ))}
        
        {/* Start message */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <p className="text-xl font-bold mb-2">Flappy Bird</p>
              <p className="mb-4">Click or press Space to start</p>
              <p className="text-sm text-gray-600">Tap to fly, avoid the pipes!</p>
            </div>
          </div>
        )}
        
        {/* Game over screen */}
        {gameOver && (
          <GameOver 
            score={score} 
            highScore={user.highScore || 0} 
            onRestart={startGame} 
          />
        )}
      </div>
      
      <div className="mt-6 text-center text-gray-600">
        <p>Click or press Space to jump</p>
      </div>
    </div>
  )
}
