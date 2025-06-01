// const MusicPlayer = ({ songUrl }: { songUrl: string }) => {
//     if (!songUrl) return null;
//     console.log("Trying to play song:", songUrl);
//     return (
//         <div>
//             <h3>🎵 מתנגן עכשיו</h3>
//             <audio controls src={songUrl} autoPlay onError={() => alert("Error playing song!")} />
//             {/* <button onClick={() => document.querySelector("audio")?.play()}>▶️ הפעל שוב</button> */}
//         </div>
//     );
// };

// export default MusicPlayer;

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

const MusicPlayer = ({ songUrl }: { songUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      setIsPlaying(true)
    }
  }, [songUrl])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value)
    setCurrentTime(seekTime)
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  if (!songUrl) return null

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background:
          "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 25%, rgba(240, 147, 251, 0.95) 50%, rgba(245, 87, 108, 0.95) 75%, rgba(79, 172, 254, 0.95) 100%)",
        padding: "20px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.2)",
        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        animation: "slideUp 0.5s ease-out",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes equalizer {
          0% { height: 5px; }
          50% { height: 20px; }
          100% { height: 5px; }
        }
        
        .equalizer-bar {
          width: 4px;
          background: white;
          border-radius: 2px;
          margin: 0 2px;
        }
        
        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
        }
        
        .volume-slider::-moz-range-thumb {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
        }
        
        .progress-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
        }
        
        .progress-slider::-moz-range-thumb {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
        }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3
          style={{
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              height: "30px",
              gap: "2px",
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="equalizer-bar"
                style={{
                  animation: isPlaying ? `equalizer ${0.5 + Math.random() * 0.5}s ease-in-out infinite` : "none",
                  animationDelay: `${i * 0.1}s`,
                  height: isPlaying ? "15px" : "5px",
                }}
              ></div>
            ))}
          </div>
          🎵 מתנגן עכשיו
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ color: "white", fontSize: "14px" }}>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            style={{
              width: "200px",
              height: "5px",
              borderRadius: "5px",
              background: "linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3))",
              outline: "none",
              transition: "all 0.3s",
            }}
            className="progress-slider"
          />
          <span style={{ color: "white", fontSize: "14px" }}>{formatTime(duration)}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "white", fontSize: "16px" }}>🔈</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              style={{
                width: "80px",
                height: "5px",
                borderRadius: "5px",
                background: "linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3))",
                outline: "none",
              }}
              className="volume-slider"
            />
          </div>

          <button
            onClick={handlePlayPause}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              border: "2px solid rgba(255, 255, 255, 0.5)",
              color: "white",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement
              target.style.transform = "scale(1.1)"
              target.style.background = "rgba(255, 255, 255, 0.3)"
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement
              target.style.transform = "scale(1)"
              target.style.background = "rgba(255, 255, 255, 0.2)"
            }}
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={songUrl}
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onError={() => alert("Error playing song!")}
        style={{ display: "none" }}
      />
    </div>
  )
}

export default MusicPlayer
