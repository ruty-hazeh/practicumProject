// import { useState, useRef, MouseEvent } from 'react';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';

// type Song = {
//   id: number;
//   name: string;
//   singerName: string;
//   genre: string;
// };

// export default function MoodDrawPage() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [songs, setSongs] = useState<Song[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;
//     ctx.beginPath();
//     ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//     setIsDrawing(true);
//   };

//   const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing || !canvasRef.current) return;
//     const ctx = canvasRef.current.getContext('2d');
//     if (!ctx) return;
//     ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//     ctx.stroke();
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//   };

//   const handleClear = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   };

//   const handleGeneratePlaylist = async () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const imageBlob = await new Promise<Blob | null>((resolve) =>
//       canvas.toBlob((blob) => resolve(blob), 'image/png')
//     );

//     if (!imageBlob) return;

//     const formData = new FormData();
//     formData.append('drawing', imageBlob, 'drawing.png');

//     setLoading(true);

//     try {
//       const res = await fetch('https://localhost:7208/api/mood/playlist-from-drawing', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!res.ok) throw new Error('Failed to fetch playlist');

//       const data: Song[] = await res.json();
//       setSongs(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//       <Card className="p-4">
//         <h2 className="text-xl font-semibold mb-2">ציירי איך את מרגישה 🎨</h2>
//         <canvas
//           ref={canvasRef}
//           width={400}
//           height={300}
//           style={{ border: '1px solid #ccc', borderRadius: '8px', marginBottom: '1rem' }}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//         ></canvas>
//         <div style={{ display: 'flex', gap: '0.5rem' }}>
//           <Button variant="contained" onClick={handleGeneratePlaylist} disabled={loading}>
//             {loading ? 'יוצר רשימה...' : 'צור פלייליסט מהציור'}
//           </Button>
//           <Button variant="outlined" onClick={handleClear}>
//             נקה ציור
//           </Button>
//         </div>
//       </Card>

//       <Card className="p-4">
//         <h2 className="text-xl font-semibold mb-2">🎵 שירים שמתאימים למצב הרוח שלך</h2>
//         <CardContent>
//           {songs.length === 0 ? (
//             <p>עוד לא נוצר פלייליסט.</p>
//           ) : (
//             <ul style={{ padding: 0, listStyle: 'none' }}>
//               {songs.map((song) => (
//                 <li key={song.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
//                   <strong>{song.name}</strong> מאת {song.singerName} ({song.genre})
//                 </li>
//               ))}
//             </ul>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


import { useState, useRef, MouseEvent, TouchEvent } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

type Song = {
  id: number;
  name: string;
  singerName: string;
  genre: string;
};

export default function MoodDrawPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  const getCoordinates = (
    e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };
    }
  };

  const startDrawing = (
    e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSongs([]);
  };

  const handleGeneratePlaylist = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageBlob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((blob) => resolve(blob), 'image/png')
    );

    if (!imageBlob) return;

    const formData = new FormData();
    formData.append('drawing', imageBlob, 'drawing.png');

    setLoading(true);

    try {
      const res = await fetch('https://localhost:7208/api/mood/playlist-from-drawing', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to fetch playlist');

      const data = await res.json();
      if (data && Array.isArray(data.songs)) {
        console.log("good")

        setSongs(data.songs);
      } else {
        console.error('Invalid data from server:', data);
        alert('השרת החזיר תגובה לא צפויה');
        setSongs([]);
      }
    } catch (error) {
      console.error('Error generating playlist:', error);
      alert('שגיאה בשליחת הציור לשרת');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-2">ציירי איך את מרגישה 🎨</h2>
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="border border-gray-300 rounded mb-4"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        ></canvas>
        <div className="flex gap-2">
          <Button variant="contained" onClick={handleGeneratePlaylist} disabled={loading}>
            {loading ? 'יוצר רשימה...' : 'צור פלייליסט מהציור'}
          </Button>
          <Button variant="outlined" onClick={handleClear}>
            נקה ציור
          </Button>
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-2">🎵 שירים שמתאימים למצב הרוח שלך</h2>
        <CardContent>
          {songs.length === 0 ? (
            <p className="text-gray-500">עוד לא נוצר פלייליסט.</p>
          ) : (
            <ul className="list-none p-0">
              {songs.map((song) => (
                <li key={song.id} className="border-b border-gray-200 pb-2 mb-2">
                  <strong>{song.name}</strong> מאת {song.singerName} ({song.genre})
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
