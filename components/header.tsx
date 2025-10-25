export default function Header() {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Aegis</h1>
            <p className="text-xs text-muted-foreground">Spam Email Detector</p>
          </div>
        </div>
      </div>
    </header>
  )
}
