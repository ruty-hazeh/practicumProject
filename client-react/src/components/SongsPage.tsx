

// import { useState, useEffect } from "react";
// import SongsList from "./SongsList";
// import SongFilters from "./SongFilters";
// import MusicPlayer from "./MusicPlayer";
// import { ApiClient, Song } from "../api/client";

// const SongsPage = () => {
//     const apiClient = new ApiClient("https://localhost:7208");
//     const [songs, setSongs] = useState<Song[]>([]);
//     const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
//     const [currentSong, setCurrentSong] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         setLoading(true);
//         fetch("https://localhost:7208/api/s3/files")
//             .then(res => {
//                 if (!res.ok) throw new Error("Failed to fetch files.");
//                 return res.json();
//             })
//             .then(async (fileNames: string[]) => {
//                 const songRequests = fileNames.map(fileName =>
//                     fetch(`https://localhost:7208/api/song/by-name/${encodeURIComponent(fileName)}`)
//                         .then(res => (res.ok ? res.json() : null))
//                         .catch(() => null) // אם יש שגיאה, דילוג על שיר ספציפי
//                 );

//                 const songData = await Promise.all(songRequests);
//                 const validSongs = songData.filter(song => song !== null) as Song[];
//                 setSongs(validSongs);
//             })
//             .catch(err => {
//                 console.error("Error fetching songs:", err);
//                 setError("Failed to load songs.");
//             })
//             .finally(() => setLoading(false));
//     }, []);

//     const filterSongs = async (singer: string, genre: string) => {
//         let singerId: number | null = null;

//         if (singer) {
//             try {
//                 const singerData = await apiClient.singerGET2(encodeURIComponent(singer));
//                 console.log(singerData.id)
//                 if (!singerData) {
//                     console.warn(`Singer "${singer}" not found!`);
//                     return;
//                 }

//                 singerId = singerData?.id || null; // מקבלת את ה-ID של הזמר
//             } catch (error) {
//                 console.error("Error fetching singer ID:", error);
//                 return; // אם יש שגיאה, לא נמשיך בסינון
//             }
//         }

//         const filtered = songs.filter(song =>
//             (singerId ? song.singerId === singerId : true) &&
//             (genre ? song.genre?.toLowerCase().includes(genre.toLowerCase()) : true)
//         );

//         setFilteredSongs(filtered);
//     };

//     return (
//         <div>
//             <h1>🎵 נגן מוזיקה</h1>
//             {loading && <p>Loading songs...</p>}
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             {!loading && !error && (
//                 <>
//                     <SongFilters onFilter={filterSongs} />
//                     <SongsList
//                         songs={filteredSongs.length > 0 ? filteredSongs : songs}
//                         onPlay={setCurrentSong}
//                     />
//                     {currentSong && <MusicPlayer songUrl={currentSong} />}
//                 </>
//             )}
//         </div>
//     );
// };

// export default SongsPage;



import { useState, useEffect } from "react";
import SongsList from "./SongsList";
import SongFilters from "./SongFilters";
import MusicPlayer from "./MusicPlayer";
import { ApiClient, Song } from "../api/client";

const SongsPage = () => {
    const apiClient = new ApiClient("https://localhost:7208");
    const [songs, setSongs] = useState<Song[]>([]);
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
    const [currentSong, setCurrentSong] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch("https://localhost:7208/api/s3/files")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch files.");
                return res.json();
            })
            .then(async (fileNames: string[]) => {
                const songRequests = fileNames.map(fileName =>
                    fetch(`https://localhost:7208/api/song/by-name/${encodeURIComponent(fileName)}`)
                        .then(res => (res.ok ? res.json() : null))
                        .catch(() => null) // אם יש שגיאה, דילוג על שיר ספציפי
                );

                const songData = await Promise.all(songRequests);
                const validSongs = songData.filter(song => song !== null) as Song[];
                setSongs(validSongs);
            })
            .catch(err => {
                console.error("Error fetching songs:", err);
                setError("Failed to load songs.");
            })
            .finally(() => setLoading(false));
    }, []);

    const filterSongs = async (singer: string, genre: string) => {
        let singerId: number | null = null;

        if (singer) {
            try {
                const singerData = await apiClient.singerGET2(encodeURIComponent(singer));
                console.log(singerData.id)
                if (!singerData) {
                    console.warn(`Singer "${singer}" not found!`);
                    return;
                }

                singerId = singerData?.id || null; // מקבלת את ה-ID של הזמר
            } catch (error) {
                console.error("Error fetching singer ID:", error);
                return; // אם יש שגיאה, לא נמשיך בסינון
            }
        }

        const filtered = songs.filter(song =>
            (singerId ? song.singerId === singerId : true) &&
            (genre ? song.genre?.toLowerCase().includes(genre.toLowerCase()) : true)
        );

        setFilteredSongs(filtered);
    };

    return (
        <div className="bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500 min-h-screen flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold text-white mb-6">🎶 נגן מוזיקה</h1>
            {loading && <p className="text-white text-xl">טוען שירים...</p>}
            {error && <p className="text-red-500 text-xl">{error}</p>}
            {!loading && !error && (
                <>
                    <SongFilters onFilter={filterSongs} />
                    <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg mt-6">
                        <SongsList
                            songs={filteredSongs.length > 0 ? filteredSongs : songs}
                            onPlay={setCurrentSong}
                        />
                    </div>
                    {currentSong && <MusicPlayer songUrl={currentSong} />}
                </>
            )}
        </div>
    );
};

export default SongsPage;
