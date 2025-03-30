

// import { useState } from "react";

// const SongFilters = ({ onFilter }: { onFilter: (singer: string, genre: string) => void }) => {
//     const [singer, setSinger] = useState('');
//     const [genre, setGenre] = useState('');

//     const handleSearch = () => {
//         console.log(singer)
//         console.log(genre)
//         onFilter(singer, genre);
//         setSinger(""); // ניקוי שדות אחרי חיפוש
//         setGenre("");
//     };

//     return (
//         <div>
//             <input placeholder="Search by singer" value={singer} onChange={e => setSinger(e.target.value)} />
//             <input placeholder="Search by genre" value={genre} onChange={e => setGenre(e.target.value)} />
//             <button onClick={handleSearch}>🔍 Search</button>
//         </div>
//     );
// }

// export default SongFilters;
import { useState } from "react";

const SongFilters = ({ onFilter }: { onFilter: (singer: string, genre: string) => void }) => {
    const [singer, setSinger] = useState('');
    const [genre, setGenre] = useState('');

    const handleSearch = () => {
        console.log(singer)
        console.log(genre)
        onFilter(singer, genre);
        setSinger(""); // ניקוי שדות אחרי חיפוש
        setGenre("");
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-6">
            <div className="space-y-4">
                <input 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="חפש לפי שם זמר" 
                    value={singer} 
                    onChange={e => setSinger(e.target.value)} 
                />
                <input 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="חפש לפי ז'אנר" 
                    value={genre} 
                    onChange={e => setGenre(e.target.value)} 
                />
                <button 
                    onClick={handleSearch} 
                    className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 focus:outline-none"
                >
                    🔍 חפש
                </button>
            </div>
        </div>
    );
};

export default SongFilters;
