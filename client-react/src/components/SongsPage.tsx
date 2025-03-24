import { useState, useEffect } from "react";
import { ApiClient, Song } from "../api/client";
import SongsList from "./SongsList";
import SongFilters from "./SongFilters";
import MusicPlayer from "./MusicPlayer";

const SongsPage = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
    const [currentSong, setCurrentSong] = useState<string | null>(null);

    useEffect(() => {
        const client = new ApiClient("https://localhost:7208");
        client.songAll().then(setSongs);
    }, []);

    const filterSongs = (singer: string, genre: string) => {
        let filtered = songs;
        if (singer) filtered = filtered.filter(song => song.singer?.name === singer);
        if (genre) filtered = filtered.filter(song => song.genre === genre);
        setFilteredSongs(filtered);
    };

    return (
        <div>
            <h1>🎵 נגן מוזיקה</h1>
            <SongFilters onFilter={filterSongs} />
            <SongsList songs={filteredSongs.length > 0 ? filteredSongs : songs} onPlay={setCurrentSong} />
            {currentSong && <MusicPlayer songUrl={currentSong} />}
        </div>
    );
};

export default SongsPage;
