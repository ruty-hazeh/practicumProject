
// import { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Dialog } from '@headlessui/react';
// import { UserContext } from './userContext';
// import MusicPlayer from './MusicPlayer';
// import {Song } from "../api/client";


// type Playlist = {
//   id: number;
//   name: string;
//   songs: Song[];
// };

// export default function PlaylistPage() {
//   const [playlists, setPlaylists] = useState<Playlist[]>([]);
//   const [songs, setSongs] = useState<Song[]>([]);
//   const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
//   const [newName, setNewName] = useState('');
//   const [moodText, setMoodText] = useState('');
//   const [error, setError] = useState('');
//   const [songSelections, setSongSelections] = useState<Record<number, number | null>>({});
//   const [currentSongUrl, setCurrentSongUrl] = useState<string | null>(null);

//   const context = useContext(UserContext);

//   useEffect(() => {
//     fetchPlaylists();
//     fetchSongs();
//   }, []);

//   const fetchPlaylists = async () => {
//     try {
//       const res = await axios.get('https://server-dotnet.onrender.com/api/playlists');
//       if (Array.isArray(res.data)) setPlaylists(res.data);
//       else setError('שגיאה בטעינת פלייליסטים');
//     } catch {
//       setError('שגיאה בטעינת פלייליסטים');
//     }
//   };

//   const fetchSongs = async () => {
//     try {
//       const res = await axios.get('https://server-dotnet.onrender.com/api/song');
//       if (Array.isArray(res.data)) setSongs(res.data);
//       else setError('שגיאה בטעינת שירים');
//     } catch {
//       setError('שגיאה בטעינת שירים');
//     }
//   };

//   const createPlaylist = async () => {
//     if (!newName.trim()) return;
//     if (!context?.user?.id) return setError('משתמש לא מחובר');
//     try {
//       await axios.post('https://server-dotnet.onrender.com/api/playlists', {
//         name: newName,
//         userId: context.user.id,
//         songIds: [],
//       });
//       setNewName('');
//       fetchPlaylists();
//     } catch {
//       setError('שגיאה ביצירת פלייליסט');
//     }
//   };

//   const generateSmartPlaylist = async () => {
//     if (!moodText.trim()) return;
//     if (!context?.user?.id) return setError('משתמש לא מחובר');
//     try {
//       const res = await axios.post(
//         `https://server-dotnet.onrender.com/api/playlists/smart?userId=${context.user.id}`,
//         { moodText }
//       );
//       console.log('פלייליסט חכם נוצר:', res.data);
//       setMoodText('');
//       fetchPlaylists();
//     } catch (err) {
//       console.error('שגיאה ביצירת פלייליסט חכם:', err);
//       setError('שגיאה ביצירת פלייליסט חכם');
//     }
//   };

//   const addSongToPlaylist = async (playlistId: number) => {
//     const songId = songSelections[playlistId];
//     if (!songId) return;
//     try {
//       await axios.post(`https://server-dotnet.onrender.com/api/playlists/${playlistId}/songs`, {
//         songId,
//       });
//       const res = await axios.get(`https://server-dotnet.onrender.com/api/playlists/${playlistId}`);
//       setSelectedPlaylist(res.data);
//       fetchPlaylists();
//       setSongSelections((prev) => ({ ...prev, [playlistId]: null }));
//     } catch {
//       setError('שגיאה בהוספת שיר');
//     }
//   };

//   const deleteSongFromPlaylist = async (playlistId: number, songId: number) => {
//     try {
//       await axios.delete(`https://server-dotnet.onrender.com/api/playlists/${playlistId}/songs/${songId}`);
//       setSelectedPlaylist((prev) =>
//         prev ? { ...prev, songs: prev.songs.filter((s) => s.id !== songId) } : prev
//       );
//       fetchPlaylists();
//     } catch {
//       setError('שגיאה במחיקת שיר');
//     }
//   };

//   const deletePlaylist = async (id: number) => {
//     try {
//       await axios.delete(`https://server-dotnet.onrender.com/api/playlists/${id}`);
//       fetchPlaylists();
//     } catch {
//       setError('שגיאה במחיקת פלייליסט');
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🎧 ניהול פלייליסטים</h2>

//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       {/* יצירת פלייליסט */}
//       <div className="flex gap-2 mb-4">
//         <input
//           value={newName}
//           onChange={(e) => setNewName(e.target.value)}
//           placeholder="שם פלייליסט חדש"
//           className="border p-2 rounded w-full"
//         />
//         <button
//           onClick={createPlaylist}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           🎶 צור פלייליסט
//         </button>
//       </div>

//       {/* מצב רוח */}
//       <div className="mb-6">
//         <textarea
//           value={moodText}
//           onChange={(e) => setMoodText(e.target.value)}
//           placeholder="איך את מרגישה?"
//           className="border p-2 rounded w-full"
//           rows={3}
//         />
//         <button
//           onClick={generateSmartPlaylist}
//           className="bg-green-500 text-white px-4 py-2 mt-2 rounded w-full hover:bg-green-600"
//         >
//           🎯 צור פלייליסט חכם
//         </button>
//       </div>

//       {/* תצוגת פלייליסטים */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {playlists.map((p) => (
//           <button
//             key={p.id}
//             onClick={() => setSelectedPlaylist({ ...p, songs: p.songs ?? [] })}
//             className="border p-4 bg-yellow-100 hover:bg-yellow-200 rounded"
//           >
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/716/716784.png"
//               alt="folder"
//               className="w-8 mx-auto"
//             />
//             <p className="mt-2">{p.name}</p>
//           </button>
//         ))}
//       </div>

//       {/* דיאלוג של שירים */}
//       <Dialog open={!!selectedPlaylist} onClose={() => {setSelectedPlaylist(null); setCurrentSongUrl(null);}} className="relative z-50">
//         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//         <div className="fixed inset-0 flex items-center justify-center">
//           <Dialog.Panel className="bg-white p-6 rounded max-w-md w-full shadow-lg">
//             <Dialog.Title className="text-lg font-bold mb-2 flex justify-between">
//               {selectedPlaylist?.name}
//               <button
//                 onClick={() => deletePlaylist(selectedPlaylist!.id)}
//                 className="text-red-500 text-sm"
//               >
//                 🗑️ מחק
//               </button>
//             </Dialog.Title>

//             {/* שירים */}
//             <div className="max-h-60 overflow-y-auto mb-4">
//               {selectedPlaylist?.songs.length ? (
//                 <ul className="space-y-2">
//                   {selectedPlaylist.songs.map((s) => (
//                     <li key={s.id} className="flex justify-between items-center">
//                       <span>🎵 {s.name}</span>
//                       <div className="flex items-center gap-2">
//                         {/* {s.url && <audio src={s.url} controls className="w-28" />} */}
//                         <button
//                           onClick={() => s.songUrl && setCurrentSongUrl(s.songUrl)}
//                           className="text-green-600 text-sm"
//                         >
//                           ▶️ הפעל
//                         </button>

//                         <button
//                           onClick={() => deleteSongFromPlaylist(selectedPlaylist.id, s.id||0)}
//                           className="text-red-500 text-sm"
//                         >
//                           מחק
//                         </button>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500">אין שירים עדיין</p>
//               )}
//             </div>

//             {/* הוספת שיר */}
//             <select
//               className="border p-2 rounded w-full mb-2"
//               value={songSelections[selectedPlaylist?.id ?? 0] ?? ''}
//               onChange={(e) =>
//                 setSongSelections((prev) => ({
//                   ...prev,
//                   [selectedPlaylist!.id]: e.target.value ? Number(e.target.value) : null,
//                 }))
//               }
//             >
//               <option value="">בחר שיר להוספה</option>
//               {songs.map((s) => (
//                 <option key={s.id} value={s.id}>
//                   {s.name} 
//                 </option>
//               ))}
//             </select>

//             <button
//               onClick={() => addSongToPlaylist(selectedPlaylist!.id)}
//               className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
//             >
//               ➕ הוסף שיר
//             </button>


//             {currentSongUrl && <MusicPlayer songUrl={currentSongUrl} />}

//             <button
//               onClick={() => setSelectedPlaylist(null)}
//               className="mt-4 text-gray-600 hover:underline w-full"
//             >
//               סגור
//             </button>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// }


"use client"

import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "./userContext"
import MusicPlayer from "./MusicPlayer"
import type { Song } from "../api/client"

type Playlist = {
  id: number
  name: string
  songs: Song[]
}

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [songs, setSongs] = useState<Song[]>([])
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)
  const [newName, setNewName] = useState("")
  const [moodText, setMoodText] = useState("")
  const [error, setError] = useState("")
  const [songSelections, setSongSelections] = useState<Record<number, number | null>>({})
  const [currentSongUrl, setCurrentSongUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [smartLoading, setSmartLoading] = useState(false)

  const context = useContext(UserContext)

  useEffect(() => {
    fetchPlaylists()
    fetchSongs()
  }, [])

  const fetchPlaylists = async () => {
    try {
      const res = await axios.get("https://server-dotnet.onrender.com/api/playlists")
      if (Array.isArray(res.data)) setPlaylists(res.data)
      else setError("שגיאה בטעינת פלייליסטים")
    } catch {
      setError("שגיאה בטעינת פלייליסטים")
    }
  }

  const fetchSongs = async () => {
    try {
      const res = await axios.get("https://server-dotnet.onrender.com/api/song")
      if (Array.isArray(res.data)) setSongs(res.data)
      else setError("שגיאה בטעינת שירים")
    } catch {
      setError("שגיאה בטעינת שירים")
    }
  }

  const createPlaylist = async () => {
    if (!newName.trim()) return
    if (!context?.user?.id) return setError("משתמש לא מחובר")
    setIsLoading(true)
    try {
      await axios.post("https://server-dotnet.onrender.com/api/playlists", {
        name: newName,
        userId: context.user.id,
        songIds: [],
      },
       { withCredentials: true })
      setNewName("")
      fetchPlaylists()
    } catch {
      setError("שגיאה ביצירת פלייליסט")
    } finally {
      setIsLoading(false)
    }
  }

  const generateSmartPlaylist = async () => {
    if (!moodText.trim()) return
    if (!context?.user?.id) return setError("משתמש לא מחובר")
    setSmartLoading(true)
    try {
      const res = await axios.post(`https://server-dotnet.onrender.com/api/playlists/smart?userId=${context.user.id}`, {
        moodText,
      }, { withCredentials: true })
      console.log("פלייליסט חכם נוצר:", res.data)
      setMoodText("")
      fetchPlaylists()
    } catch (err) {
      console.error("שגיאה ביצירת פלייליסט חכם:", err)
      setError("שגיאה ביצירת פלייליסט חכם")
    } finally {
      setSmartLoading(false)
    }
  }

  const addSongToPlaylist = async (playlistId: number) => {
    const songId = songSelections[playlistId]
    if (!songId) return
    try {
      await axios.post(
        `https://server-dotnet.onrender.com/api/playlists/${playlistId}/songs`,
        { songId }, { withCredentials: true }
          );
         
      const res = await axios.get(`https://server-dotnet.onrender.com/api/playlists/${playlistId}`,
        { withCredentials: true }
      )
      setSelectedPlaylist(res.data)
      fetchPlaylists()
      setSongSelections((prev) => ({ ...prev, [playlistId]: null }))
    } catch {
      setError("שגיאה בהוספת שיר")
    }
  }

  const deleteSongFromPlaylist = async (playlistId: number, songId: number) => {
    try {
      await axios.delete(`https://server-dotnet.onrender.com/api/playlists/${playlistId}/songs/${songId}`, { withCredentials: true })
      setSelectedPlaylist((prev) => (prev ? { ...prev, songs: prev.songs.filter((s) => s.id !== songId) } : prev))
      fetchPlaylists()
    } catch {
      setError("שגיאה במחיקת שיר")
    }
  }

  const deletePlaylist = async (id: number) => {
    try {
      await axios.delete(`https://server-dotnet.onrender.com/api/playlists/${id}`, { withCredentials: true })
      fetchPlaylists()
      setSelectedPlaylist(null)
    } catch {
      setError("שגיאה במחיקת פלייליסט")
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        padding: "40px 20px 100px",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -60%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
      `}</style>

      {/* Decorative Elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "150px",
          height: "150px",
          background: "linear-gradient(45deg, rgba(255, 107, 107, 0.3), rgba(254, 202, 87, 0.3))",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "float 8s ease-in-out infinite",
          zIndex: 1,
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "200px",
          height: "200px",
          background: "linear-gradient(45deg, rgba(72, 202, 228, 0.3), rgba(168, 230, 207, 0.3))",
          borderRadius: "50%",
          filter: "blur(50px)",
          animation: "float 10s ease-in-out infinite reverse",
          zIndex: 1,
        }}
      ></div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            animation: "fadeIn 0.8s ease-out",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: "900",
              color: "white",
              marginBottom: "15px",
              textShadow: "0 5px 20px rgba(0, 0, 0, 0.3)",
              background: "linear-gradient(45deg, #ffffff, #feca57)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            🎧 ניהול פלייליסטים
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "rgba(255, 255, 255, 0.9)",
              maxWidth: "600px",
              margin: "0 auto",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            צור, נהל והאזן לפלייליסטים שלך
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: "rgba(255, 107, 107, 0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 107, 107, 0.5)",
              borderRadius: "15px",
              padding: "15px",
              color: "white",
              textAlign: "center",
              marginBottom: "30px",
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            {error}
          </div>
        )}

        {/* Create Playlist Section */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
            animation: "slideIn 0.6s ease-out",
          }}
        >
          <h3
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
              textAlign: "center",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            🎶 צור פלייליסט חדש
          </h3>

          <div style={{ display: "flex", gap: "15px", marginBottom: "20px", flexWrap: "wrap" }}>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="שם פלייליסט חדש"
              style={{
                flex: 1,
                minWidth: "200px",
                padding: "15px",
                borderRadius: "15px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.3s",
                backdropFilter: "blur(5px)",
                direction: "rtl",
              }}
              onFocus={(e) => {
                const target = e.target as HTMLInputElement
                target.style.border = "2px solid rgba(255, 255, 255, 0.6)"
                target.style.background = "rgba(255, 255, 255, 0.2)"
              }}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement
                target.style.border = "2px solid rgba(255, 255, 255, 0.3)"
                target.style.background = "rgba(255, 255, 255, 0.1)"
              }}
            />
            <button
              onClick={createPlaylist}
              disabled={isLoading}
              style={{
                padding: "15px 25px",
                background: isLoading ? "rgba(255, 255, 255, 0.3)" : "linear-gradient(45deg, #667eea, #764ba2)",
                color: "white",
                border: "none",
                borderRadius: "15px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.3s",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                minWidth: "150px",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  const target = e.target as HTMLButtonElement
                  target.style.transform = "translateY(-2px)"
                  target.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.3)"
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  const target = e.target as HTMLButtonElement
                  target.style.transform = "translateY(0)"
                  target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)"
                }
              }}
            >
              {isLoading ? (
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
                  יוצר...
                </>
              ) : (
                <>🎶 צור פלייליסט</>
              )}
            </button>
          </div>

          {/* Smart Playlist */}
          <div>
            <textarea
              value={moodText}
              onChange={(e) => setMoodText(e.target.value)}
              placeholder="איך את מרגישה? תאר את מצב הרוח שלך ואנחנו ניצור פלייליסט מתאים..."
              rows={3}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "15px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.3s",
                backdropFilter: "blur(5px)",
                resize: "vertical",
                minHeight: "80px",
                direction: "rtl",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.border = "2px solid rgba(255, 255, 255, 0.6)"
                target.style.background = "rgba(255, 255, 255, 0.2)"
              }}
              onBlur={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.border = "2px solid rgba(255, 255, 255, 0.3)"
                target.style.background = "rgba(255, 255, 255, 0.1)"
              }}
            />
            <button
              onClick={generateSmartPlaylist}
              disabled={smartLoading}
              style={{
                width: "100%",
                padding: "15px",
                background: smartLoading ? "rgba(255, 255, 255, 0.3)" : "linear-gradient(45deg, #f093fb, #f5576c)",
                color: "white",
                border: "none",
                borderRadius: "15px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: smartLoading ? "not-allowed" : "pointer",
                transition: "all 0.3s",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
              onMouseEnter={(e) => {
                if (!smartLoading) {
                  const target = e.target as HTMLButtonElement
                  target.style.transform = "translateY(-2px)"
                  target.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.3)"
                }
              }}
              onMouseLeave={(e) => {
                if (!smartLoading) {
                  const target = e.target as HTMLButtonElement
                  target.style.transform = "translateY(0)"
                  target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)"
                }
              }}
            >
              {smartLoading ? (
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
                  יוצר פלייליסט חכם...
                </>
              ) : (
                <>🎯 צור פלייליסט חכם</>
              )}
            </button>
          </div>
        </div>

        {/* Playlists Grid */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
            animation: "fadeIn 0.8s ease-out",
          }}
        >
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "25px",
              textAlign: "center",
            }}
          >
            📁 הפלייליסטים שלי
          </h3>

          {playlists.length === 0 ? (
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
              עדיין לא יצרת פלייליסטים. צור את הראשון שלך!
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
              }}
            >
              {playlists.map((p, index) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlaylist({ ...p, songs: p.songs ?? [] })}
                  style={{
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    border: "none",
                    borderRadius: "20px",
                    padding: "25px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                    color: "white",
                    textAlign: "center",
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement
                    target.style.transform = "translateY(-5px) scale(1.02)"
                    target.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.2)"
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement
                    target.style.transform = "translateY(0) scale(1)"
                    target.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  {/* Shimmer Effect */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                      backgroundSize: "200px 100%",
                      animation: "shimmer 3s infinite",
                    }}
                  ></div>

                  <div
                    style={{
                      fontSize: "48px",
                      marginBottom: "15px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    📁
                  </div>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      margin: "0",
                      textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                      position: "relative",
                      zIndex: 1,
                      direction: "rtl",
                    }}
                  >
                    {p.name}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      opacity: 0.8,
                      margin: "5px 0 0",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {p.songs?.length || 0} שירים
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Playlist Modal */}
        {selectedPlaylist && (
          <>
            {/* Backdrop */}
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(10px)",
                zIndex: 1000,
                animation: "fadeIn 0.3s ease-out",
              }}
              onClick={() => {
                setSelectedPlaylist(null)
                setCurrentSongUrl(null)
              }}
            >
              {/* Modal */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "90%",
                  maxWidth: "600px",
                  maxHeight: "80vh",
                  background:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 25%, rgba(240, 147, 251, 0.95) 50%, rgba(245, 87, 108, 0.95) 75%, rgba(79, 172, 254, 0.95) 100%)",
                  borderRadius: "25px",
                  padding: "0",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 25px 80px rgba(0, 0, 0, 0.3)",
                  animation: "modalSlideIn 0.4s ease-out",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div
                  style={{
                    padding: "25px 30px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "white",
                      margin: 0,
                      textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                      direction: "rtl",
                    }}
                  >
                    📁 {selectedPlaylist.name}
                  </h3>
                  <button
                    onClick={() => deletePlaylist(selectedPlaylist.id)}
                    style={{
                      background: "rgba(255, 107, 107, 0.2)",
                      border: "1px solid rgba(255, 107, 107, 0.5)",
                      borderRadius: "10px",
                      color: "white",
                      padding: "8px 12px",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLButtonElement
                      target.style.background = "rgba(255, 107, 107, 0.4)"
                      target.style.transform = "scale(1.05)"
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLButtonElement
                      target.style.background = "rgba(255, 107, 107, 0.2)"
                      target.style.transform = "scale(1)"
                    }}
                  >
                    🗑️ מחק פלייליסט
                  </button>
                </div>

                {/* Songs List */}
                <div
                  style={{
                    flex: 1,
                    padding: "20px 30px",
                    overflowY: "auto",
                    maxHeight: "300px",
                  }}
                >
                  {selectedPlaylist.songs.length ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                      {selectedPlaylist.songs.map((s, index) => (
                        <div
                          key={s.id}
                          style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(5px)",
                            borderRadius: "15px",
                            padding: "15px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            animation: `slideIn 0.3s ease-out ${index * 0.1}s both`,
                          }}
                        >
                          <span
                            style={{
                              color: "white",
                              fontSize: "16px",
                              fontWeight: "bold",
                              textShadow: "0 1px 5px rgba(0, 0, 0, 0.3)",
                              direction: "rtl",
                              flex: 1,
                            }}
                          >
                            🎵 {s.name}
                          </span>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <button
                              onClick={() => s.songUrl && setCurrentSongUrl(s.songUrl)}
                              style={{
                                background: "linear-gradient(45deg, #4facfe, #00f2fe)",
                                border: "none",
                                borderRadius: "8px",
                                color: "white",
                                padding: "8px 12px",
                                fontSize: "14px",
                                cursor: "pointer",
                                transition: "all 0.3s",
                                fontWeight: "bold",
                              }}
                              onMouseEnter={(e) => {
                                const target = e.target as HTMLButtonElement
                                target.style.transform = "scale(1.05)"
                                target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)"
                              }}
                              onMouseLeave={(e) => {
                                const target = e.target as HTMLButtonElement
                                target.style.transform = "scale(1)"
                                target.style.boxShadow = "none"
                              }}
                            >
                              ▶️ הפעל
                            </button>
                            <button
                              onClick={() => deleteSongFromPlaylist(selectedPlaylist.id, s.id || 0)}
                              style={{
                                background: "rgba(255, 107, 107, 0.2)",
                                border: "1px solid rgba(255, 107, 107, 0.5)",
                                borderRadius: "8px",
                                color: "white",
                                padding: "8px 12px",
                                fontSize: "14px",
                                cursor: "pointer",
                                transition: "all 0.3s",
                              }}
                              onMouseEnter={(e) => {
                                const target = e.target as HTMLButtonElement
                                target.style.background = "rgba(255, 107, 107, 0.4)"
                                target.style.transform = "scale(1.05)"
                              }}
                              onMouseLeave={(e) => {
                                const target = e.target as HTMLButtonElement
                                target.style.background = "rgba(255, 107, 107, 0.2)"
                                target.style.transform = "scale(1)"
                              }}
                            >
                              🗑️ מחק
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "40px 20px",
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "18px",
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "15px",
                        backdropFilter: "blur(5px)",
                      }}
                    >
                      אין שירים בפלייליסט עדיין
                    </div>
                  )}
                </div>

                {/* Add Song Section */}
                <div
                  style={{
                    padding: "20px 30px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                    background: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <select
                      value={songSelections[selectedPlaylist.id] ?? ""}
                      onChange={(e) =>
                        setSongSelections((prev) => ({
                          ...prev,
                          [selectedPlaylist.id]: e.target.value ? Number(e.target.value) : null,
                        }))
                      }
                      style={{
                        padding: "12px 15px",
                        borderRadius: "15px",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "white",
                        fontSize: "16px",
                        outline: "none",
                        cursor: "pointer",
                        backdropFilter: "blur(5px)",
                        direction: "rtl",
                      }}
                    >
                      <option value="" style={{ background: "#764ba2", color: "white" }}>
                        בחר שיר להוספה
                      </option>
                      {songs.map((s) => (
                        <option key={s.id} value={s.id} style={{ background: "#764ba2", color: "white" }}>
                          {s.name}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => addSongToPlaylist(selectedPlaylist.id)}
                      style={{
                        background: "linear-gradient(45deg, #667eea, #764ba2)",
                        color: "white",
                        border: "none",
                        borderRadius: "15px",
                        padding: "12px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLButtonElement
                        target.style.transform = "translateY(-2px)"
                        target.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.3)"
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLButtonElement
                        target.style.transform = "translateY(0)"
                        target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)"
                      }}
                    >
                      ➕ הוסף שיר לפלייליסט
                    </button>
                  </div>
                </div>

                {/* Close Button */}
                <div style={{ padding: "20px 30px", textAlign: "center" }}>
                  <button
                    onClick={() => {
                      setSelectedPlaylist(null)
                      setCurrentSongUrl(null)
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "15px",
                      color: "white",
                      padding: "12px 30px",
                      fontSize: "16px",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      backdropFilter: "blur(5px)",
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLButtonElement
                      target.style.background = "rgba(255, 255, 255, 0.3)"
                      target.style.transform = "scale(1.05)"
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLButtonElement
                      target.style.background = "rgba(255, 255, 255, 0.2)"
                      target.style.transform = "scale(1)"
                    }}
                  >
                    סגור
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {currentSongUrl && <MusicPlayer songUrl={currentSongUrl} />}
      </div>
    </div>
  )
}

