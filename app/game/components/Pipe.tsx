'use client'

import { useEffect, useRef } from 'react'

interface PipeProps {
  position: { x: number, y: number }
  height: number
  isTop: boolean
}

export default function Pipe({ position, height, isTop }: PipeProps) {
  const pipeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pipeRef.current) {
      pipeRef.current.style.left = `${position.x}px`
      pipeRef.current.style.height = `${height}px`
      
      if (isTop) {
        pipeRef.current.style.top = '0'
      } else {
        pipeRef.current.style.bottom = '0'
      }
    }
  }, [position, height, isTop])

  return (
    <div 
      ref={pipeRef}
      className="pipe"
      style={{
        borderRadius: '4px',
      }}
    >
      <div className="w-full h-8 bg-green-800 absolute bottom-0 rounded-b-sm"></div>
      {isTop && <div className="w-full h-8 bg-green-800 absolute top-auto bottom-0 rounded-b-sm"></div>}
    </div>
  )
}
