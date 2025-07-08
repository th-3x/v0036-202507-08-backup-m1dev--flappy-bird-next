'use client'

interface GameOverProps {
  score: number
  highScore: number
  onRestart: () => void
}

export default function GameOver({ score, highScore, onRestart }: GameOverProps) {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-4 text-red-600">Game Over</h2>
        
        <div className="mb-6">
          <p className="text-xl mb-2">Score: <span className="font-bold">{score}</span></p>
          <p className="text-xl">High Score: <span className="font-bold">{highScore}</span></p>
        </div>
        
        <button
          onClick={onRestart}
          className="w-full py-3 px-6 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  )
}
