type OrbStatus = 'idle' | 'listening' | 'speaking'

interface VoiceOrbProps {
  status: OrbStatus
  onClick?: () => void
}

export default function VoiceOrb({ status, onClick }: VoiceOrbProps) {
  return (
    <>
      <style>{`
        @keyframes orb-breathe {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.07); opacity: 1; }
        }
        @keyframes orb-ripple {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes orb-ripple-2 {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes orb-ripple-3 {
          0% { transform: scale(1); opacity: 0.25; }
          100% { transform: scale(3); opacity: 0; }
        }
        .orb-breathe { animation: orb-breathe 2.4s ease-in-out infinite; }
        .orb-ripple-1 { animation: orb-ripple 1.2s ease-out infinite; }
        .orb-ripple-2 { animation: orb-ripple-2 1.2s ease-out 0.3s infinite; }
        .orb-ripple-3 { animation: orb-ripple-3 1.2s ease-out 0.6s infinite; }
      `}</style>

      <button
        onClick={onClick}
        className="relative flex items-center justify-center focus:outline-none group"
        style={{ width: 160, height: 160 }}
        aria-label={`Agent ${status}`}
      >
        {/* Ripple rings — only during speaking */}
        {status === 'speaking' && (
          <>
            <span
              className="orb-ripple-1 absolute rounded-full"
              style={{ width: 160, height: 160, background: 'var(--marco-accent)', opacity: 0.6 }}
            />
            <span
              className="orb-ripple-2 absolute rounded-full"
              style={{ width: 160, height: 160, background: 'var(--marco-accent)', opacity: 0.4 }}
            />
            <span
              className="orb-ripple-3 absolute rounded-full"
              style={{ width: 160, height: 160, background: 'var(--marco-accent)', opacity: 0.25 }}
            />
          </>
        )}

        {/* Core orb */}
        <span
          className={`relative z-10 rounded-full transition-all duration-500 ${
            status === 'listening' ? 'orb-breathe' : ''
          }`}
          style={{
            width: 120,
            height: 120,
            background:
              status === 'idle'
                ? 'radial-gradient(circle at 40% 35%, rgba(230,96,101,0.45), rgba(230,96,101,0.18))'
                : 'radial-gradient(circle at 40% 35%, #e66065, #c44448)',
            boxShadow:
              status === 'idle'
                ? '0 0 0 1px rgba(230,96,101,0.25)'
                : '0 0 32px rgba(230,96,101,0.55), 0 0 0 1px rgba(230,96,101,0.4)',
          }}
        />

        {/* Mic icon */}
        <svg
          className="absolute z-20 pointer-events-none"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke={status === 'idle' ? 'rgba(230,96,101,0.75)' : 'white'}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M5 10a7 7 0 0 0 14 0" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="8" y1="22" x2="16" y2="22" />
        </svg>
      </button>
    </>
  )
}
