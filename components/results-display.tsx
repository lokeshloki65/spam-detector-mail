"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SpamAnalyzer from "./spam-analyzer"

interface ResultsDisplayProps {
  results: {
    spamScore: number
    riskLevel: string
    threats: string[]
    analysis: string
    recommendations: string[]
  }
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const getThreatColor = (threat: string) => {
    if (threat.includes("phishing")) return "bg-red-500/10 text-red-700 border-red-200"
    if (threat.includes("malware")) return "bg-orange-500/10 text-orange-700 border-orange-200"
    if (threat.includes("spoofing")) return "bg-yellow-500/10 text-yellow-700 border-yellow-200"
    return "bg-blue-500/10 text-blue-700 border-blue-200"
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Spam Score Gauge */}
      <Card className="border border-border/50 bg-card/50 backdrop-blur-sm p-8">
        <SpamAnalyzer score={results.spamScore} />
      </Card>

      {/* Threats */}
      {results.threats.length > 0 && (
        <Card className="border border-border/50 bg-card/50 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Detected Threats</h3>
          <div className="flex flex-wrap gap-2">
            {results.threats.map((threat, idx) => (
              <span key={idx} className={`px-3 py-1 rounded-full text-sm font-medium border ${getThreatColor(threat)}`}>
                {threat}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Analysis */}
      <Card className="border border-border/50 bg-card/50 backdrop-blur-sm p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">Analysis</h3>
        <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">{results.analysis}</p>
      </Card>

      {/* Recommendations */}
      {results.recommendations.length > 0 && (
        <Card className="border border-border/50 bg-card/50 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recommendations</h3>
          <ul className="space-y-2">
            {results.recommendations.map((rec, idx) => (
              <li key={idx} className="flex gap-3 text-foreground/80">
                <span className="text-primary font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={() => window.location.reload()} variant="outline" className="flex-1">
          Analyze Another Email
        </Button>
      </div>
    </div>
  )
}
