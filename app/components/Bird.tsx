'use client'

import { useEffect, useRef } from 'react'

interface BirdProps {
  position: number
  rotation: number
}

export default function Bird({ position, rotation }: BirdProps) {
  const birdRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (birdRef.current) {
      birdRef.current.style.transform = `translateY(${position}px) rotate(${rotation}deg)`
    }
  }, [position, rotation])

  return (
    <div 
      ref={birdRef}
      className="bird animate-bird-fly"
      style={{
        left: '60px',
        backgroundColor: '#f9e25a', // Yellow bird color
        borderRadius: '50%',
        border: '2px solid #000',
        boxShadow: '0 0 0 2px #fff',
        transition: 'transform 0.1s',
      }}
    >
      {/* Bird eye */}
      <div className="absolute w-3 h-3 bg-white rounded-full top-2 right-3">
        <div className="absolute w-1.5 h-1.5 bg-black rounded-full top-0.5 right-0.5"></div>
      </div>
      {/* Bird beak */}
      <div className="absolute w-4 h-2 bg-orange-500 rounded-r-md top-4 -right-3"></div>
    </div>
  )
}
