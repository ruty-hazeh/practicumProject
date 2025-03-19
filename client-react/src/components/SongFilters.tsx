import  { useState } from "react";


const SongFilters = ({ onFilter }: { onFilter: Function }) => {
    const [singer, setSinger] = useState('')
    const [genre, setGenre] = useState('')

    return (
        <div>
            <input placeholder="search by singer" value={singer} onChange={e => setSinger(e.target.value)} />
            <input placeholder="search by genre" value={genre} onChange={e => setGenre(e.target.value)} />
            <button onClick={() => onFilter(singer, genre)} >🔍search</button>

        </div>
    )
}
export default SongFilters;