'use client';

export default function AudioVisualizer({ isPlaying }: { isPlaying: boolean }) {
    return (
        <div className="flex items-end gap-1 h-8">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className={`w-1.5 bg-rose-400 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
                    style={{
                        height: isPlaying ? '100%' : '20%',
                        animation: isPlaying ? `bounce ${0.5 + i * 0.1}s infinite alternate` : 'none'
                    }}
                />
            ))}
            <style jsx>{`
        @keyframes bounce {
          0% { height: 20%; opacity: 0.5; }
          100% { height: 100%; opacity: 1; }
        }
      `}</style>
        </div>
    );
}
