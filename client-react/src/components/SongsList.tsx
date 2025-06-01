// import { ApiClient } from "../api/client";
// import { Song } from "../api/client";
// import { useState } from "react";

// const SongsList = ({ songs, onPlay }: { songs: Song[], onPlay: (url: string) => void }) => {

   

//     const [loading, setLoading] = useState<boolean>(false);
//     const apiClient = new ApiClient("https://server-dotnet.onrender.com");


//     const removeExtension = (fileName: string) => {
//         return fileName.replace(/\.mp3$/, ''); // מסירה את הסיומת .mp3
//     };
//     // הפונקציה שתהיה אחראית להורדה בלבד של השיר
//     const handleDownload = async (fileName: string) => {
//         try {
          
//             setLoading(true);
//             await apiClient.download(fileName);  // קורא לפונקציה שמורידה את השיר
//         } catch (error) {
//             console.error("Error downloading the song:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <ul className="space-y-4">
//             {songs.map(song => (
//                 <li key={song.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-3">
//                     <p className="text-xl font-semibold text-gray-800"><strong>שיר:</strong> {removeExtension(song.name||"")}</p>
//                     <p className="text-md text-gray-600"><strong>ז'אנר:</strong> {song.genre || "לא ידוע"}</p>
//                     <div className="flex space-x-3 mt-2">
//                         <button 
//                             onClick={() => onPlay(song?.songUrl ?? "no url")} 
//                             className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 focus:outline-none"
//                         >
//                             ▶️ השמע
//                         </button>
//                         <button
//                             onClick={() => handleDownload(song.name || "")}
//                             disabled={loading}
//                             className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none ${loading ? 'cursor-wait' : ''}`}
//                         >
//                             {loading ? 'מעבד...' : 'הורד'}
//                         </button>
//                     </div>
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default SongsList;



"use client"

import { useState } from "react"
import { ApiClient } from "../api/client"
import type { Song } from "../api/client"

const SongsList = ({ songs, onPlay }: { songs: Song[]; onPlay: (url: string) => void }) => {
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const apiClient = new ApiClient("https://server-dotnet.onrender.com")

  const removeExtension = (fileName: string) => {
    return fileName.replace(/\.mp3$/, "") // מסירה את הסיומת .mp3
  }

  // הפונקציה שתהיה אחראית להורדה בלבד של השיר
  const handleDownload = async (fileName: string) => {
    try {
      setLoading((prev) => ({ ...prev, [fileName]: true }))
      await apiClient.download(fileName) // קורא לפונקציה שמורידה את השיר
    } catch (error) {
      console.error("Error downloading the song:", error)
    } finally {
      setLoading((prev) => ({ ...prev, [fileName]: false }))
    }
  }

  const handlePlay = (url: string, songId: string) => {
    setCurrentlyPlaying(songId)
    onPlay(url)
  }

  return (
    <div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
        
        .song-card {
          animation: fadeIn 0.5s ease-out;
          animation-fill-mode: both;
        }
        
        .download-btn:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }
      `}</style>

      <h2
        style={{
          color: "#333",
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        🎵 רשימת השירים
      </h2>

      {songs.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#666",
            fontSize: "18px",
            background: "rgba(255, 255, 255, 0.5)",
            borderRadius: "15px",
            backdropFilter: "blur(5px)",
          }}
        >
          לא נמצאו שירים מתאימים לחיפוש שלך
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="song-card"
              style={{
                background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                borderRadius: "20px",
                padding: "25px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                transition: "all 0.3s ease",
                animationDelay: `${index * 0.1}s`,
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLDivElement
                target.style.transform = "translateY(-5px)"
                target.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.15)"
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLDivElement
                target.style.transform = "translateY(0)"
                target.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)"
              }}
            >
              {/* Decorative Music Note */}
              <div
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  fontSize: "24px",
                  opacity: 0.1,
                }}
              >
                🎵
              </div>

              {/* Song Info */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "5px",
                    direction: "rtl",
                    textAlign: "right",
                  }}
                >
                  {removeExtension(song.name || "")}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    marginBottom: "5px",
                    direction: "rtl",
                    textAlign: "right",
                  }}
                >
                  <strong>ז'אנר:</strong> {song.genre || "לא ידוע"}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  onClick={() => handlePlay(song?.songUrl ?? "no url", song.id?.toString() || "")}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background:
                      currentlyPlaying === song.id?.toString()
                        ? "linear-gradient(45deg, #4facfe, #00f2fe)"
                        : "linear-gradient(45deg, #667eea, #764ba2)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement
                    target.style.transform = "translateY(-2px)"
                    target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)"
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement
                    target.style.transform = "translateY(0)"
                    target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  {currentlyPlaying === song.id?.toString() ? "🔊 מתנגן" : "▶️ השמע"}
                </button>

                <button
                  onClick={() => handleDownload(song.name || "")}
                  disabled={loading[song.name || ""]}
                  className="download-btn"
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "linear-gradient(45deg, #ff6b6b, #feca57)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: loading[song.name || ""] ? "wait" : "pointer",
                    transition: "all 0.3s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading[song.name || ""]) {
                      const target = e.target as HTMLButtonElement
                      target.style.transform = "translateY(-2px)"
                      target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading[song.name || ""]) {
                      const target = e.target as HTMLButtonElement
                      target.style.transform = "translateY(0)"
                      target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
                    }
                  }}
                >
                  {loading[song.name || ""] ? (
                    <>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid rgba(255, 255, 255, 0.3)",
                          borderTop: "2px solid white",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      ></div>
                      מוריד...
                    </>
                  ) : (
                    <>⬇️ הורד</>
                  )}
                </button>
              </div>

              {/* Playing Indicator */}
              {currentlyPlaying === song.id?.toString() && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background:
                      "linear-gradient(90deg, rgba(79, 172, 254, 0.7), rgba(0, 242, 254, 0.7), rgba(79, 172, 254, 0.7))",
                    backgroundSize: "200px 100%",
                    animation: "shimmer 2s infinite linear",
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SongsList
