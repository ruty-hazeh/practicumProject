
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
//         <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-6">
//             <div className="space-y-4">
//                 <input 
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     placeholder="חפש לפי שם זמר" 
//                     value={singer} 
//                     onChange={e => setSinger(e.target.value)} 
//                 />
//                 <input 
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     placeholder="חפש לפי ז'אנר" 
//                     value={genre} 
//                     onChange={e => setGenre(e.target.value)} 
//                 />
//                 <button 
//                     onClick={handleSearch} 
//                     className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 focus:outline-none"
//                 >
//                     🔍 חפש
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SongFilters;


import { useState } from "react";

interface Props {
    onFilter: (singer: string, genre: string) => void;
    availableGenres: string[];
    availableSingers: string[];
}

const SongFilters = ({ onFilter, availableGenres, availableSingers }: Props) => {
    const [selectedSinger, setSelectedSinger] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter(selectedSinger, selectedGenre);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center">
            <select
                value={selectedSinger}
                onChange={(e) => setSelectedSinger(e.target.value)}
                className="p-2 rounded border border-gray-300"
            >
                <option value="">בחר זמר</option>
                {availableSingers.map((singer, idx) => (
                    <option key={idx} value={singer}>{singer}</option>
                ))}
            </select>

            <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="p-2 rounded border border-gray-300"
            >
                <option value="">בחר ז'אנר</option>
                {availableGenres.map((genre, idx) => (
                    <option key={idx} value={genre}>{genre}</option>
                ))}
            </select>

            <button
                type="submit"
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded shadow"
            >
                סנן
            </button>
        </form>
    );
};

export default SongFilters;
