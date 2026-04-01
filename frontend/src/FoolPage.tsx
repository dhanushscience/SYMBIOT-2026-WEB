import React, { useState, useEffect } from 'react';
import './style.css';

interface FoolPageProps {
  onBack: () => void;
}

const FoolPage: React.FC<FoolPageProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<'terminal' | 'reveal'>('terminal');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  
  // Terminal typing animation over a few seconds
  useEffect(() => {
    const lines = [
      "INITIATING SECURE REGISTRATION PROTOCOL...",
      "CONNECTING TO UNSTOP SERVERS...",
      "AUTHENTICATING CREDENTIALS...",
      "[ERROR] UNAUTHORIZED ACCESS DETECTED!",
      "WARNING: FIREWALL BREACH IN PROGRESS.",
      "DOWNLOADING SYSTEM_WIPER.EXE... 14%",
      "DOWNLOADING SYSTEM_WIPER.EXE... 48%",
      "DOWNLOADING SYSTEM_WIPER.EXE... 89%",
      "SYSTEM FAILURE IMMINENT. GOODBYE."
    ];
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setTerminalLines(prev => [...prev, lines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        // Pause briefly after the text is typed before revealing
        setTimeout(() => setPhase('reveal'), 800);
      }
    }, 450);
    
    return () => clearInterval(interval);
  }, []);

  // "Running away" button logic
  const [buttonPos, setButtonPos] = useState({ top: '0', left: '0' });
  const [moves, setMoves] = useState(0);

  const handleNoInteraction = () => {
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
      }
    } catch (e) {}

    const newTop = Math.random() * 80 + 10; 
    const newLeft = Math.random() * 80 + 10;
    setButtonPos({ top: `${newTop}%`, left: `${newLeft}%` });
    setMoves(moves + 1);
  };

  if (phase === 'terminal') {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: '#000', color: '#0f0', fontFamily: 'monospace',
        padding: '2rem', zIndex: 999999, fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
        display: 'flex', flexDirection: 'column', gap: '12px'
      }}>
        {terminalLines.map((line, i) => (
          <div key={i} style={{ animation: 'fadeIn 0.2s ease-out' }}>{'>'} {line}</div>
        ))}
        <div className="blinking-cursor" style={{ width: '12px', height: '1.5em', backgroundColor: '#0f0' }}></div>
        <style>{`
          .blinking-cursor {
            animation: terminal-blink 1s step-end infinite;
          }
          @keyframes terminal-blink { 50% { opacity: 0; } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: '#0a0f1e', zIndex: 999999, display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', textAlign: 'center', overflow: 'hidden',
      background: 'radial-gradient(circle at center, #1b2742 0%, #0a0f1e 100%)'
    }}>
      <div style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', marginBottom: '1rem', animation: 'bounce 2s infinite' }}>🤪</div>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)', color: '#ff4444', textTransform: 'uppercase', marginBottom: '1rem', textShadow: '0 0 20px rgba(255,68,68,0.6)' }}>
        APRIL FOOLS!
      </h1>
      <p style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.8rem)', color: '#fff', maxWidth: '800px', lineHeight: '1.6', marginBottom: '1rem', fontWeight: 'bold' }}>
        Did we scare you? Don't worry, your files are safe (for now)! 😂
      </p>
      <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', color: 'var(--text-secondary)', maxWidth: '700px', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        Are you SURE you want to register? It's going to be a tough 24 hours of endless coding, debugging, and hardware troubleshooting!
      </p>
      <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', color: 'var(--accent-cyan)', maxWidth: '750px', lineHeight: '1.6', marginBottom: '3rem', fontWeight: 'bold', textShadow: '0 0 10px rgba(0, 255, 136, 0.3)' }}>
        Okay, joke's over. Registration isn't actually closing today... *yet!* But slots are filling up incredibly fast. Secure your team's spot right now before you actually miss out!
      </p>

      {/* The container for the buttons */}
      <div style={{ position: 'relative', width: '100vw', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
        {/* YES BUTTON */}
        <a 
          href="https://unstop.com/p/symbiot-2026-vidyavardhaka-college-of-engineering-mysore-1652707" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary prank-btn-red" 
          style={{
            padding: '1.5rem 3rem', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', textTransform: 'uppercase', 
            letterSpacing: '2px', fontWeight: 'bold', zIndex: 10
          }}
          onClick={onBack}
        >
          YES, I'M READY! 🚀
        </a>

        {/* NO BUTTON */}
        <button 
          className="btn btn-secondary" 
          style={{
            position: moves > 0 ? 'fixed' : 'relative',
            top: moves > 0 ? buttonPos.top : 'auto',
            left: moves > 0 ? buttonPos.left : 'auto',
            transform: moves > 0 ? 'translate(-50%, -50%)' : 'none',
            padding: '1.5rem 3rem', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', textTransform: 'uppercase', 
            letterSpacing: '2px', fontWeight: 'bold', transition: 'all 0.1s ease-out',
            zIndex: 9999999, background: 'transparent', border: '2px solid #555', color: '#ccc'
          }}
          onMouseEnter={handleNoInteraction}
          onClick={handleNoInteraction}
        >
          NO, I'M SCARED 😭
        </button>
      </div>

      <button 
        onClick={onBack} 
        style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', opacity: 0.5, zIndex: 20 }}
        aria-label="Close prank and return to site"
      >
        ✕
      </button>

      <style>
        {`
          .prank-btn-red {
            background: linear-gradient(135deg, #ff3333, #cc0000) !important;
            border: none !important;
            color: white !important;
            box-shadow: 0 4px 15px rgba(255, 51, 51, 0.5) !important;
          }
          .prank-btn-red:hover {
            box-shadow: 0 8px 30px rgba(255, 51, 51, 0.8) !important;
          }
        `}
      </style>
    </div>
  );
};

export default FoolPage;
