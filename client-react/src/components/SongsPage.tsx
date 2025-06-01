// import { useState, useEffect } from "react";
// import SongsList from "./SongsList";
// import SongFilters from "./SongFilters";
// import MusicPlayer from "./MusicPlayer";
// import { Song, Singer } from "../api/client";

// const SongsPage = () => {
//     // const apiClient = new ApiClient("https://server-dotnet.onrender.com");

//     const [songs, setSongs] = useState<Song[]>([]);
//     const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
//     const [currentSong, setCurrentSong] = useState<string | null>(null);
//     const [availableGenres, setAvailableGenres] = useState<string[]>([]);
//     const [availableSingers, setAvailableSingers] = useState<string[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchSongsAndSingers = async () => {
//             try {
//                 setLoading(true);
//                 const res = await fetch("https://server-dotnet.onrender.com/api/s3/files");
//                 if (!res.ok) throw new Error("Failed to fetch files.");
//                 const fileNames: string[] = await res.json();

//                 const songRequests = fileNames.map(fileName =>
//                     fetch(`https://server-dotnet.onrender.com/api/song/by-name/${encodeURIComponent(fileName)}`)
//                         .then(res => (res.ok ? res.json() : null))
//                         .catch(() => null)
//                 );

//                 const songData = await Promise.all(songRequests);
//                 const validSongs = songData.filter(song => song !== null) as Song[];
//                 setSongs(validSongs);

//                 // ז'אנרים
//                 const genres = Array.from(
//                     new Set(validSongs.map(song => song.genre).filter((g): g is string => !!g))
//                 );
//                 setAvailableGenres(genres);

//                 // ID של זמרים מתוך השירים
//                 const singerIds = Array.from(
//                     new Set(validSongs.map(s => s.singerId).filter((id): id is number => !!id))
//                 );

//                 // שליפת שמות זמרים לפי ID
//                 // const singerFetches = singerIds.map(id =>
//                 //     apiClient.singerGET(id).catch(() => null)
//                 // );


//                 const singerFetches = singerIds.map(id =>
//                     fetch(`https://server-dotnet.onrender.com/api/singer/${id}`)
//                         .then(res => res.ok ? res.json() : null)
//                         .catch(() => null)
//                 );
//                 const singerResults = await Promise.all(singerFetches);
//                 const singers = singerResults
//                     .filter((s): s is Singer => s !== null && !!s.name)
//                     .map(s => s.name!);

//                 setAvailableSingers(singers);
//             } catch (err) {
//                 console.error("Error:", err);
//                 setError("אירעה שגיאה בטעינת השירים.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSongsAndSingers();
//     }, []);

//     const filterSongs = async (singerName: string, genre: string) => {
//         let singerId: number | null = null;

//         if (singerName) {
//             try {
//                 // const singerData = await apiClient.singerGET2(encodeURIComponent(singerName));
//                 const response = await fetch(`https://server-dotnet.onrender.com/api/singer/by-name/${encodeURIComponent(singerName)}`);
//                 if (!response.ok) throw new Error("Failed to fetch singer data");
//                 const singerData = await response.json();
//                 if (singerData) singerId = singerData.id||0;
//             } catch (error) {
//                 console.error("Error fetching singer ID:", error);
//                 return;
//             }
//         }

//         const filtered = songs.filter(song =>
//             (!singerId || song.singerId === singerId) &&
//             (!genre || (song.genre?.toLowerCase().includes(genre.toLowerCase())))
//         );

//         setFilteredSongs(filtered);
//     };

//     return (
//         <div className="bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500 min-h-screen flex flex-col items-center justify-center p-6">
//             <h1 className="text-4xl font-bold text-white mb-6">🎶 נגן מוזיקה</h1>
//             {loading && <p className="text-white text-xl">טוען שירים...</p>}
//             {error && <p className="text-red-500 text-xl">{error}</p>}
//             {!loading && !error && (
//                 <>
//                     <SongFilters
//                         onFilter={filterSongs}
//                         availableGenres={availableGenres}
//                         availableSingers={availableSingers}
//                     />
//                     <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg mt-6">
//                         <SongsList
//                             songs={filteredSongs.length > 0 ? filteredSongs : songs}
//                             onPlay={setCurrentSong}
//                         />
//                     </div>
//                     {currentSong && <MusicPlayer songUrl={currentSong} />}
//                 </>
//             )}
//         </div>
//     );
// };

// export default SongsPage;



"use client"

import { useState, useEffect } from "react"
import SongsList from "./SongsList"
import SongFilters from "./SongFilters"
import MusicPlayer from "./MusicPlayer"
import type { Song, Singer } from "../api/client"

const SongsPage = () => {
  const [songs, setSongs] = useState<Song[]>([])
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([])
  const [currentSong, setCurrentSong] = useState<string | null>(null)
  const [availableGenres, setAvailableGenres] = useState<string[]>([])
  const [availableSingers, setAvailableSingers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSongsAndSingers = async () => {
      try {
        setLoading(true)
        const res = await fetch("https://server-dotnet.onrender.com/api/s3/files")
        if (!res.ok) throw new Error("Failed to fetch files.")
        const fileNames: string[] = await res.json()

        const songRequests = fileNames.map((fileName) =>
          fetch(`https://server-dotnet.onrender.com/api/song/by-name/${encodeURIComponent(fileName)}`)
            .then((res) => (res.ok ? res.json() : null))
            .catch(() => null),
        )

        const songData = await Promise.all(songRequests)
        const validSongs = songData.filter((song) => song !== null) as Song[]
        setSongs(validSongs)

        // ז'אנרים
        const genres = Array.from(new Set(validSongs.map((song) => song.genre).filter((g): g is string => !!g)))
        setAvailableGenres(genres)

        // ID של זמרים מתוך השירים
        const singerIds = Array.from(new Set(validSongs.map((s) => s.singerId).filter((id): id is number => !!id)))

        // שליפת שמות זמרים לפי ID
        const singerFetches = singerIds.map((id) =>
          fetch(`https://server-dotnet.onrender.com/api/singer/${id}`)
            .then((res) => (res.ok ? res.json() : null))
            .catch(() => null),
        )
        const singerResults = await Promise.all(singerFetches)
        const singers = singerResults.filter((s): s is Singer => s !== null && !!s.name).map((s) => s.name!)

        setAvailableSingers(singers)
      } catch (err) {
        console.error("Error:", err)
        setError("אירעה שגיאה בטעינת השירים.")
      } finally {
        setLoading(false)
      }
    }

    fetchSongsAndSingers()
  }, [])

  const filterSongs = async (singerName: string, genre: string) => {
    let singerId: number | null = null

    if (singerName) {
      try {
        const response = await fetch(
          `https://server-dotnet.onrender.com/api/singer/by-name/${encodeURIComponent(singerName)}`,
        )
        if (!response.ok) throw new Error("Failed to fetch singer data")
        const singerData = await response.json()
        if (singerData) singerId = singerData.id || 0
      } catch (error) {
        console.error("Error fetching singer ID:", error)
        return
      }
    }

    const filtered = songs.filter(
      (song) =>
        (!singerId || song.singerId === singerId) &&
        (!genre || song.genre?.toLowerCase().includes(genre.toLowerCase())),
    )

    setFilteredSongs(filtered)
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          animation: "fadeIn 0.8s ease-out",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h1
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
          🎶 נגן מוזיקה
        </h1>
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(255, 255, 255, 0.9)",
            maxWidth: "600px",
            margin: "0 auto",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          האזן, הורד וצור פלייליסטים מהשירים האהובים עליך
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "5px solid rgba(255, 255, 255, 0.3)",
              borderTop: "5px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginBottom: "20px",
            }}
          ></div>
          <p style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>טוען שירים...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          style={{
            padding: "30px",
            background: "rgba(255, 107, 107, 0.2)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 107, 107, 0.5)",
            color: "white",
            textAlign: "center",
            maxWidth: "500px",
            margin: "0 auto",
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>{error}</p>
          <button
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onClick={() => window.location.reload()}
          >
            נסה שוב
          </button>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          <SongFilters onFilter={filterSongs} availableGenres={availableGenres} availableSingers={availableSingers} />

          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
              animation: "fadeIn 0.8s ease-out",
              position: "relative",
              zIndex: 2,
              marginBottom: "80px",
            }}
          >
            <SongsList songs={filteredSongs.length > 0 ? filteredSongs : songs} onPlay={setCurrentSong} />
          </div>

          {currentSong && <MusicPlayer songUrl={currentSong} />}
        </>
      )}
    </div>
  )
}

export default SongsPage
