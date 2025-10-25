"use client"

import { useEffect, useState } from "react"

interface SpamAnalyzerProps {
  score: number
  isLoading?: boolean
}

export default function SpamAnalyzer({ score, isLoading = false }: SpamAnalyzerProps) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    if (isLoading) return

    const interval = setInterval(() => {
      setDisplayScore((prev) => {
        if (prev < score) {
          return Math.min(prev + 2, score)
        }
        return prev
      })
    }, 20)

    return () => clearInterval(interval)
  }, [score, isLoading])

  const getColor = (value: number) => {
    if (value < 30) return "#10b981" // green
    if (value < 60) return "#f59e0b" // amber
    return "#ef4444" // red
  }

  const getRiskLevel = (value: number) => {
    if (value < 30) return "Low Risk"
    if (value < 60) return "Medium Risk"
    return "High Risk"
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/20"
          />

          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={getColor(displayScore)}
            strokeWidth="8"
            strokeDasharray={`${(displayScore / 100) * 565.48} 565.48`}
            strokeLinecap="round"
            className="transition-all duration-300"
            style={{ transform: "rotate(-90deg)", transformOrigin: "100px 100px" }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold" style={{ color: getColor(displayScore) }}>
            {Math.round(displayScore)}
          </div>
          <div className="text-sm text-muted-foreground mt-2">Spam Score</div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg font-semibold" style={{ color: getColor(displayScore) }}>
          {getRiskLevel(displayScore)}
        </p>
      </div>
    </div>
  )
}
