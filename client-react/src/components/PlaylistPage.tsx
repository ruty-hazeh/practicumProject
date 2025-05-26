// import { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { UserContext } from './userContext';

// type Song = {
//   id: number;
//   name: string;
//   genre: string;
//   singerName: string;
//   url?: string;
// };

// type Playlist = {
//   id: number;
//   name: string;
//   songs: Song[];
// };

// export default function PlaylistPage() {
//   const [playlists, setPlaylists] = useState<Playlist[]>([]);
//   const [songs, setSongs] = useState<Song[]>([]);
//   const [expandedPlaylistId, setExpandedPlaylistId] = useState<number | null>(null);
//   const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);
//   const [newName, setNewName] = useState('');
//   const [moodText, setMoodText] = useState('');
//   const [error, setError] = useState('');
//   const [songSelections, setSongSelections] = useState<Record<number, number | null>>({});
//   const context = useContext(UserContext);

//   useEffect(() => {
//     fetchPlaylists();
//     fetchSongs();
//   }, []);

//   const fetchPlaylists = async () => {
//     try {
//       const res = await axios.get('https://localhost:7208/api/playlists');
//       // הגנה במקרה שהנתונים לא מערך
//       if (Array.isArray(res.data)) {
//         setPlaylists(res.data);
//         setError('');
//       } else {
//         setError('קיבלנו נתונים לא תקינים מהשרת לפלייליסטים');
//       }
//     } catch {
//       setError('שגיאה בטעינת פלייליסטים');
//     }
//   };

//   const fetchSongs = async () => {
//     try {
//       const res = await axios.get('https://localhost:7208/api/song');
//       if (Array.isArray(res.data)) {
//         setSongs(res.data);
//         setError('');
//       } else {
//         setError('קיבלנו נתונים לא תקינים מהשרת לשירים');
//       }
//     } catch {
//       setError('שגיאה בטעינת שירים');
//     }
//   };

//   const createPlaylist = async () => {
//     if (!newName.trim()) return;
//     try {
//       if (!context || !context.user?.id) {
//         setError('משתמש לא מחובר');
//         return;
//       }
  
//       await axios.post('https://localhost:7208/api/playlists', {
//         name: newName,
//         userId: context.user.id, // כאן נשלח את ה־userId
//         songIds: []
//       });
  
//       setNewName('');
//       fetchPlaylists();
//       setError('');
//     } catch {
//       setError('שגיאה ביצירת פלייליסט');
//     }
//   };

//   const deletePlaylist = async (id: number) => {
//     try {
//       await axios.delete(`https://localhost:7208/api/playlists/${id}`);
//       fetchPlaylists();
//       setError('');
//     } catch {
//       setError('שגיאה במחיקת פלייליסט');
//     }
//   };

//   const generateSmartPlaylist = async () => {
//     if (!selectedPlaylistId || !moodText.trim()) return;
//     try {
//       await axios.post(`https://localhost:7208/api/playlists/${selectedPlaylistId}/smart`, {
//         moodText,
//       });
//       setMoodText('');
//       fetchPlaylists();
//       setError('');
//     } catch {
//       setError('שגיאה ביצירת פלייליסט חכם');
//     }
//   };

//   const addSongToPlaylist = async (playlistId: number) => {
//     const songId = songSelections[playlistId];
//     if (!playlistId || !songId) return;
//     try {
//       await axios.post(`https://localhost:7208/api/playlists/${playlistId}/songs`, {
//         songId,
//       });
//       fetchPlaylists();
//       setSongSelections((prev) => ({ ...prev, [playlistId]: null }));
//       setError('');
//     } catch {
//       setError('שגיאה בהוספת שיר');
//     }
//   };

//   const deleteSongFromPlaylist = async (playlistId: number, songId: number) => {
//     try {
//       await axios.delete(`https://localhost:7208/api/playlists/${playlistId}/songs/${songId}`);
//       fetchPlaylists();
//       setError('');
//     } catch {
//       setError('שגיאה במחיקת שיר');
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🎧 ניהול פלייליסטים</h2>

//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       {/* יצירת פלייליסט חדש */}
//       <div className="flex gap-2 mb-4">
//         <input
//           value={newName}
//           onChange={(e) => setNewName(e.target.value)}
//           placeholder="שם פלייליסט חדש"
//           className="border p-2 rounded w-full"
//         />
//         <button
//           onClick={createPlaylist}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//         >
//           צור פלייליסט
//         </button>
//       </div>

//       {/* בחירת פלייליסט למצב רוח */}
//       <div className="mb-6">
//         <select
//           value={selectedPlaylistId ?? ''}
//           onChange={(e) => setSelectedPlaylistId(e.target.value ? Number(e.target.value) : null)}
//           className="border rounded p-2 w-full"
//         >
//           <option value="">בחר פלייליסט לניהול</option>
//           {playlists && playlists.length > 0 &&playlists.map((p) => (
//             <option key={p.id} value={p.id}>
//               {p.name}
//             </option>
//           ))}
//         </select>

//         <textarea
//           value={moodText}
//           onChange={(e) => setMoodText(e.target.value)}
//           placeholder="איך את מרגישה היום?"
//           className="border p-2 rounded w-full mt-2"
//           rows={3}
//         />
//         <button
//           onClick={generateSmartPlaylist}
//           className="bg-green-500 text-white px-4 py-2 mt-2 rounded w-full hover:bg-green-600 transition"
//         >
//           🎯 צור פלייליסט חכם
//         </button>
//       </div>

//       {/* תצוגת פלייליסטים */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {playlists.map((playlist) => (
//           <div
//             key={playlist.id}
//             className="text-center border rounded p-2 bg-yellow-100 hover:bg-yellow-200 transition duration-200"
//           >
//             <div
//               onClick={() =>
//                 setExpandedPlaylistId(expandedPlaylistId === playlist.id ? null : playlist.id)
//               }
//               className="cursor-pointer select-none"
//             >
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/716/716784.png"
//                 alt="folder"
//                 className="w-8 mx-auto"
//               />
//               <p className="mt-2 font-semibold">{playlist.name}</p>
//             </div>

//             {expandedPlaylistId === playlist.id && (
//               <div className="mt-4 bg-white border rounded p-3 shadow-inner text-left">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="font-bold">שירים:</span>
//                   <button
//                     onClick={() => deletePlaylist(playlist.id)}
//                     className="text-red-500 text-sm hover:underline"
//                   >
//                     🗑️ מחק פלייליסט
//                   </button>
//                 </div>

//                 {playlist.songs.length === 0 ? (
//                   <p className="text-gray-500">אין שירים בפלייליסט</p>
//                 ) : (
//                   <ul className="space-y-2">
//                     {playlist.songs.map((s) => (
//                       <li key={s.id} className="flex items-center justify-between">
//                         <div>
//                           🎵 {s.name} - {s.singerName} ({s.genre})
//                           {s.url && (
//                             <audio src={s.url} controls className="ml-2 inline-block" />
//                           )}
//                         </div>
//                         <button
//                           onClick={() => deleteSongFromPlaylist(playlist.id, s.id)}
//                           className="text-red-500 text-sm ml-4 hover:underline"
//                         >
//                           מחק
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 )}

//                 {/* הוספת שיר לפלייליסט */}
//                 <div className="mt-4">
//                   <select
//                     onChange={(e) =>
//                       setSongSelections((prev) => ({
//                         ...prev,
//                         [playlist.id]: e.target.value ? Number(e.target.value) : null,
//                       }))
//                     }
//                     value={songSelections[playlist.id] ?? ''}
//                     className="border rounded p-2 w-full"
//                   >
//                     <option value="">בחר שיר להוספה</option>
//                     {songs.map((s) => (
//                       <option key={s.id} value={s.id}>
//                         {s.name} - {s.singerName}
//                       </option>
//                     ))}
//                   </select>
//                   <button
//                     onClick={() => addSongToPlaylist(playlist.id)}
//                     className="bg-blue-600 text-white px-3 py-1 rounded mt-2 w-full hover:bg-blue-700 transition"
//                   >
//                     הוסף שיר
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Dialog } from '@headlessui/react';
// import { UserContext } from './userContext';

// type Song = {
//   id: number;
//   name: string;
//   genre: string;
//   singerName: string;
//   url?: string;
// };

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
//   const context = useContext(UserContext);

//   useEffect(() => {
//     fetchPlaylists();
//     fetchSongs();
//   }, []);

//   const fetchPlaylists = async () => {
//     try {
//       const res = await axios.get('https://localhost:7208/api/playlists');
//       if (Array.isArray(res.data)) {
//         setPlaylists(res.data);
//       } else setError('שגיאה בטעינת פלייליסטים');
//     } catch {
//       setError('שגיאה בטעינת פלייליסטים');
//     }
//   };

//   const fetchSongs = async () => {
//     try {
//       const res = await axios.get('https://localhost:7208/api/song');
//       if (Array.isArray(res.data)) {
//         setSongs(res.data);
//       } else setError('שגיאה בטעינת שירים');
//     } catch {
//       setError('שגיאה בטעינת שירים');
//     }
//   };

//   const createPlaylist = async () => {
  
//     if (!newName.trim()) return;
//     if (!context || !context.user?.id) return setError('משתמש לא מחובר');
//     try {
//       console.log({
//         name: newName,
//         userId: context.user.id,
//         songIds: [],
//       });
//       await axios.post('https://localhost:7208/api/playlists', {
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
//         `https://localhost:7208/api/playlists/smart?userId=${context.user.id}`,
//         { moodText }
//       );
//       console.log('פלייליסט חכם נוצר:', res.data);
  
//       setMoodText('');
//       await fetchPlaylists();
//     } catch (err) {
//       console.error('שגיאה ביצירת פלייליסט חכם:', err);
//       setError('שגיאה ביצירת פלייליסט חכם');
//     }
//   };

  
//   const addSongToPlaylist = async (playlistId: number) => {
//     const songId = songSelections[playlistId];
//     if (!songId) return;
//     try {
//       await axios.post(`https://localhost:7208/api/playlists/${playlistId}/songs`, {
//         songId,
//       });
//         const res = await axios.get(`https://localhost:7208/api/playlists/${playlistId}`);
//     setSelectedPlaylist(res.data);
//       fetchPlaylists();
//       setSongSelections((prev) => ({ ...prev, [playlistId]: null }));
//     } catch {
//       setError('שגיאה בהוספת שיר');
//     }
//   };

//   const deleteSongFromPlaylist = async (playlistId: number, songId: number) => {
//     try {
//       await axios.delete(`https://localhost:7208/api/playlists/${playlistId}/songs/${songId}`);

//       setSelectedPlaylist((prev) => {
//         if (!prev) return prev;
//         return {
//           ...prev,
//           songs: prev.songs.filter((song) => song.id !== songId),
//         };
//       });

//       fetchPlaylists();
//     } catch {
//       setError('שגיאה במחיקת שיר');
//     }
//   };

//   const deletePlaylist = async (id: number) => {
//     try {
//       await axios.delete(`https://localhost:7208/api/playlists/${id}`);
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
//       {/* {selectedPlaylist && ( */}
//         <div className="mb-6">
//           <textarea
//             value={moodText}
//             onChange={(e) => setMoodText(e.target.value)}
//             placeholder="איך את מרגישה?"
//             className="border p-2 rounded w-full"
//             rows={3}
//           />
//           <button
//             onClick={generateSmartPlaylist}
//             className="bg-green-500 text-white px-4 py-2 mt-2 rounded w-full hover:bg-green-600"
//           >
//             🎯 צור פלייליסט חכם
//           </button>
//         </div>
//       {/* )} */}

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
//       <Dialog open={!!selectedPlaylist} onClose={() => setSelectedPlaylist(null)} className="relative z-50">
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
//                       <span>🎵 {s.name} - {s.singerName}</span>
//                       <div className="flex items-center gap-2">
//                         {s.url && <audio src={s.url} controls className="w-28" />}
//                         <button
//                           onClick={() => deleteSongFromPlaylist(selectedPlaylist.id, s.id)}
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
//                   {s.name} - {s.singerName}
//                 </option>
//               ))}
//             </select>
//             <button
//               onClick={() => addSongToPlaylist(selectedPlaylist!.id)}
//               className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
//             >
//               ➕ הוסף שיר
//             </button>

//             <button
//                onClick={() => setSelectedPlaylist(null)}
             
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




// import { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Dialog } from '@headlessui/react';
// import { UserContext } from './userContext';

// type Song = {
//   id: number;
//   name: string;
//   genre: string;
//   singerName: string;
//   url?: string;
// };

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
//   const context = useContext(UserContext);

//   useEffect(() => {
//     fetchPlaylists();
//     fetchSongs();
//   }, []);

//   const fetchPlaylists = async () => {
//     try {
//       const res = await axios.get('https://localhost:7208/api/playlists');
//       if (Array.isArray(res.data)) {
//         setPlaylists(res.data);
//       } else setError('שגיאה בטעינת פלייליסטים');
//     } catch {
//       setError('שגיאה בטעינת פלייליסטים');
//     }
//   };

//   const fetchSongs = async () => {
//     try {
//       const res = await axios.get('https://localhost:7208/api/song');
//       if (Array.isArray(res.data)) {
//         setSongs(res.data);
//       } else setError('שגיאה בטעינת שירים');
//     } catch {
//       setError('שגיאה בטעינת שירים');
//     }
//   };

//   const createPlaylist = async () => {
  
//     if (!newName.trim()) return;
//     if (!context || !context.user?.id) return setError('משתמש לא מחובר');
//     try {
//       console.log({
//         name: newName,
//         userId: context.user.id,
//         songIds: [],
//       });
//       await axios.post('https://localhost:7208/api/playlists', {
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
//         https://localhost:7208/api/playlists/smart?userId=${context.user.id},
//         { moodText }
//       );
//       console.log('פלייליסט חכם נוצר:', res.data);
  
//       setMoodText('');
//       await fetchPlaylists();
//     } catch (err) {
//       console.error('שגיאה ביצירת פלייליסט חכם:', err);
//       setError('שגיאה ביצירת פלייליסט חכם');
//     }
//   };

  
//   const addSongToPlaylist = async (playlistId: number) => {
//     const songId = songSelections[playlistId];
//     if (!songId) return;
//     try {
//       await axios.post(https://localhost:7208/api/playlists/${playlistId}/songs, {
//         songId,
//       });
//         const res = await axios.get(https://localhost:7208/api/playlists/${playlistId});
//     setSelectedPlaylist(res.data);
//       fetchPlaylists();
//       setSongSelections((prev) => ({ ...prev, [playlistId]: null }));
//     } catch {
//       setError('שגיאה בהוספת שיר');
//     }
//   };

//   const deleteSongFromPlaylist = async (playlistId: number, songId: number) => {
//     try {
//       await axios.delete(https://localhost:7208/api/playlists/${playlistId}/songs/${songId});

//       setSelectedPlaylist((prev) => {
//         if (!prev) return prev;
//         return {
//           ...prev,
//           songs: prev.songs.filter((song) => song.id !== songId),
//         };
//       });

//       fetchPlaylists();
//     } catch {
//       setError('שגיאה במחיקת שיר');
//     }
//   };

//   const deletePlaylist = async (id: number) => {
//     try {
//       await axios.delete(https://localhost:7208/api/playlists/${id});
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
//       {/* {selectedPlaylist && ( */}
//         <div className="mb-6">
//           <textarea
//             value={moodText}
//             onChange={(e) => setMoodText(e.target.value)}
//             placeholder="איך את מרגישה?"
//             className="border p-2 rounded w-full"
//             rows={3}
//           />
//           <button
//             onClick={generateSmartPlaylist}
//             className="bg-green-500 text-white px-4 py-2 mt-2 rounded w-full hover:bg-green-600"
//           >
//             🎯 צור פלייליסט חכם
//           </button>
//         </div>
//       {/* )} */}

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
//       <Dialog open={!!selectedPlaylist} onClose={() => setSelectedPlaylist(null)} className="relative z-50">
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
//                       <span>🎵 {s.name} - {s.singerName}</span>
//                       <div className="flex items-center gap-2">
//                         {s.url && <audio src={s.url} controls className="w-28" />}
//                         <button
//                           onClick={() => deleteSongFromPlaylist(selectedPlaylist.id, s.id)}
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
//                   {s.name} - {s.singerName}
//                 </option>
//               ))}
//             </select>
//             <button
//               onClick={() => addSongToPlaylist(selectedPlaylist!.id)}
//               className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
//             >
//               ➕ הוסף שיר
//             </button>

//             <button
//                onClick={() => setSelectedPlaylist(null)}
             
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



import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import { UserContext } from './userContext';

type Song = {
  id: number;
  name: string;
  genre: string;
  singerName: string;
  url?: string;
};

type Playlist = {
  id: number;
  name: string;
  songs: Song[];
};

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [newName, setNewName] = useState('');
  const [moodText, setMoodText] = useState('');
  const [error, setError] = useState('');
  const [songSelections, setSongSelections] = useState<Record<number, number | null>>({});
  const context = useContext(UserContext);

  useEffect(() => {
    fetchPlaylists();
    fetchSongs();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const res = await axios.get('https://localhost:7208/api/playlists');
      if (Array.isArray(res.data)) setPlaylists(res.data);
      else setError('שגיאה בטעינת פלייליסטים');
    } catch {
      setError('שגיאה בטעינת פלייליסטים');
    }
  };

  const fetchSongs = async () => {
    try {
      const res = await axios.get('https://localhost:7208/api/song');
      if (Array.isArray(res.data)) setSongs(res.data);
      else setError('שגיאה בטעינת שירים');
    } catch {
      setError('שגיאה בטעינת שירים');
    }
  };

  const createPlaylist = async () => {
    if (!newName.trim()) return;
    if (!context?.user?.id) return setError('משתמש לא מחובר');
    try {
      await axios.post('https://localhost:7208/api/playlists', {
        name: newName,
        userId: context.user.id,
        songIds: [],
      });
      setNewName('');
      fetchPlaylists();
    } catch {
      setError('שגיאה ביצירת פלייליסט');
    }
  };

  const generateSmartPlaylist = async () => {
    if (!moodText.trim()) return;
    if (!context?.user?.id) return setError('משתמש לא מחובר');
    try {
      const res = await axios.post(
        `https://localhost:7208/api/playlists/smart?userId=${context.user.id}`,
        { moodText }
      );
      console.log('פלייליסט חכם נוצר:', res.data);
      setMoodText('');
      fetchPlaylists();
    } catch (err) {
      console.error('שגיאה ביצירת פלייליסט חכם:', err);
      setError('שגיאה ביצירת פלייליסט חכם');
    }
  };

  const addSongToPlaylist = async (playlistId: number) => {
    const songId = songSelections[playlistId];
    if (!songId) return;
    try {
      await axios.post(`https://localhost:7208/api/playlists/${playlistId}/songs`, {
        songId,
      });
      const res = await axios.get(`https://localhost:7208/api/playlists/${playlistId}`);
      setSelectedPlaylist(res.data);
      fetchPlaylists();
      setSongSelections((prev) => ({ ...prev, [playlistId]: null }));
    } catch {
      setError('שגיאה בהוספת שיר');
    }
  };

  const deleteSongFromPlaylist = async (playlistId: number, songId: number) => {
    try {
      await axios.delete(`https://localhost:7208/api/playlists/${playlistId}/songs/${songId}`);
      setSelectedPlaylist((prev) =>
        prev ? { ...prev, songs: prev.songs.filter((s) => s.id !== songId) } : prev
      );
      fetchPlaylists();
    } catch {
      setError('שגיאה במחיקת שיר');
    }
  };

  const deletePlaylist = async (id: number) => {
    try {
      await axios.delete(`https://localhost:7208/api/playlists/${id}`);
      fetchPlaylists();
    } catch {
      setError('שגיאה במחיקת פלייליסט');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🎧 ניהול פלייליסטים</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* יצירת פלייליסט */}
      <div className="flex gap-2 mb-4">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="שם פלייליסט חדש"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={createPlaylist}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🎶 צור פלייליסט
        </button>
      </div>

      {/* מצב רוח */}
      <div className="mb-6">
        <textarea
          value={moodText}
          onChange={(e) => setMoodText(e.target.value)}
          placeholder="איך את מרגישה?"
          className="border p-2 rounded w-full"
          rows={3}
        />
        <button
          onClick={generateSmartPlaylist}
          className="bg-green-500 text-white px-4 py-2 mt-2 rounded w-full hover:bg-green-600"
        >
          🎯 צור פלייליסט חכם
        </button>
      </div>

      {/* תצוגת פלייליסטים */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {playlists.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPlaylist({ ...p, songs: p.songs ?? [] })}
            className="border p-4 bg-yellow-100 hover:bg-yellow-200 rounded"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/716/716784.png"
              alt="folder"
              className="w-8 mx-auto"
            />
            <p className="mt-2">{p.name}</p>
          </button>
        ))}
      </div>

      {/* דיאלוג של שירים */}
      <Dialog open={!!selectedPlaylist} onClose={() => setSelectedPlaylist(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded max-w-md w-full shadow-lg">
            <Dialog.Title className="text-lg font-bold mb-2 flex justify-between">
              {selectedPlaylist?.name}
              <button
                onClick={() => deletePlaylist(selectedPlaylist!.id)}
                className="text-red-500 text-sm"
              >
                🗑️ מחק
              </button>
            </Dialog.Title>

            {/* שירים */}
            <div className="max-h-60 overflow-y-auto mb-4">
              {selectedPlaylist?.songs.length ? (
                <ul className="space-y-2">
                  {selectedPlaylist.songs.map((s) => (
                    <li key={s.id} className="flex justify-between items-center">
                      <span>🎵 {s.name} - {s.singerName}</span>
                      <div className="flex items-center gap-2">
                        {s.url && <audio src={s.url} controls className="w-28" />}
                        <button
                          onClick={() => deleteSongFromPlaylist(selectedPlaylist.id, s.id)}
                          className="text-red-500 text-sm"
                        >
                          מחק
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">אין שירים עדיין</p>
              )}
            </div>

            {/* הוספת שיר */}
            <select
              className="border p-2 rounded w-full mb-2"
              value={songSelections[selectedPlaylist?.id ?? 0] ?? ''}
              onChange={(e) =>
                setSongSelections((prev) => ({
                  ...prev,
                  [selectedPlaylist!.id]: e.target.value ? Number(e.target.value) : null,
                }))
              }
            >
              <option value="">בחר שיר להוספה</option>
              {songs.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} - {s.singerName}
                </option>
              ))}
            </select>

            <button
              onClick={() => addSongToPlaylist(selectedPlaylist!.id)}
              className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
            >
              ➕ הוסף שיר
            </button>

            <button
              onClick={() => setSelectedPlaylist(null)}
              className="mt-4 text-gray-600 hover:underline w-full"
            >
              סגור
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
