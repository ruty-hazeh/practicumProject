

// import { ApiClient } from "../api/client"; 
// import { Song } from "../api/client";
// import { useState } from "react";

// const SongsList = ({ songs, onPlay }: { songs: Song[], onPlay: (url: string) => void }) => {
//     const [loading, setLoading] = useState<boolean>(false);
//     const apiClient = new ApiClient("https://localhost:7208");

//     // הפונקציה שתהיה אחראית להורדה בלבד של השיר
//     const handleDownload = async (fileName: string) => {
//         try {
//             const encodedFileName = encodeURIComponent(fileName);
//             setLoading(true);
//             await apiClient.download(fileName);  // קורא לפונקציה שמורידה את השיר
//         } catch (error) {
//             console.error("Error downloading the song:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <ul>
//             {songs.map(song => (
//                 <li key={song.id}>
//                     <p><strong>Song:</strong> {song.name}</p>
//                     <p><strong>Genre:</strong> {song.genre || "Unknown"}</p>
//                     <button onClick={() => onPlay(song?.songUrl ?? "no url")}>▶️ Play</button>
//                     <button
//                         onClick={() => handleDownload(song.name||"")}
//                         disabled={loading}
//                     >
//                         {loading ? 'Processing...' : 'Download'}
//                     </button>
//                 </li>
//             ))}
//         </ul>
//     );
// }

// export default SongsList;



import { ApiClient } from "../api/client";
import { Song } from "../api/client";
import { useState } from "react";

const SongsList = ({ songs, onPlay }: { songs: Song[], onPlay: (url: string) => void }) => {

   

    const [loading, setLoading] = useState<boolean>(false);
    const apiClient = new ApiClient("https://localhost:7208");


    const removeExtension = (fileName: string) => {
        return fileName.replace(/\.mp3$/, ''); // מסירה את הסיומת .mp3
    };
    // הפונקציה שתהיה אחראית להורדה בלבד של השיר
    const handleDownload = async (fileName: string) => {
        try {
          
            setLoading(true);
            await apiClient.download(fileName);  // קורא לפונקציה שמורידה את השיר
        } catch (error) {
            console.error("Error downloading the song:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ul className="space-y-4">
            {songs.map(song => (
                <li key={song.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-3">
                    <p className="text-xl font-semibold text-gray-800"><strong>שיר:</strong> {removeExtension(song.name||"")}</p>
                    <p className="text-md text-gray-600"><strong>ז'אנר:</strong> {song.genre || "לא ידוע"}</p>
                    <div className="flex space-x-3 mt-2">
                        <button 
                            onClick={() => onPlay(song?.songUrl ?? "no url")} 
                            className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 focus:outline-none"
                        >
                            ▶️ השמע
                        </button>
                        <button
                            onClick={() => handleDownload(song.name || "")}
                            disabled={loading}
                            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none ${loading ? 'cursor-wait' : ''}`}
                        >
                            {loading ? 'מעבד...' : 'הורד'}
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default SongsList;
