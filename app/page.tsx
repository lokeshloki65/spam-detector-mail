"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import ResultsDisplay from "@/components/results-display" 
import Header from "@/components/header"

export default function Home() {
  const [emailContent, setEmailContent] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)     

  const handleAnalyze = async () => {
    if (!emailContent.trim()) return

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailContent }),
      })

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid gap-8">
          {/* Input Section */}
          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm p-8">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Analyze Email</h2>
                <p className="text-sm text-muted-foreground">
                  Paste your email content to detect spam and phishing attempts
                </p>
              </div>

              <Textarea
                placeholder="Paste email subject and body here..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="min-h-48 resize-none bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/50"
              />

              <Button
                onClick={handleAnalyze}
                disabled={!emailContent.trim() || isAnalyzing}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-base"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⚙️</span>
                    Analyzing...
                  </span>
                ) : (
                  "Analyze Email"
                )}
              </Button>
            </div>
          </Card>

          {/* Results Section */}
          {results && <ResultsDisplay results={results} />}

          {/* Info Cards */}
          {!results && (
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border border-border/50 bg-card/30 backdrop-blur-sm p-6">
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="font-semibold text-foreground mb-2">Real-time Detection</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered analysis using Gemini to identify spam patterns
                </p>
              </Card>

              <Card className="border border-border/50 bg-card/30 backdrop-blur-sm p-6">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-semibold text-foreground mb-2">Instant Results</h3>
                <p className="text-sm text-muted-foreground">Get detailed threat assessment and risk indicators</p>
              </Card>

              <Card className="border border-border/50 bg-card/30 backdrop-blur-sm p-6">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="font-semibold text-foreground mb-2">Deep Analysis</h3>
                <p className="text-sm text-muted-foreground">Comprehensive breakdown of suspicious elements</p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
 
