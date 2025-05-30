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
