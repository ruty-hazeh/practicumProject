import { Song } from "../api/client";


const SongsList = ({ songs, onPlay }: { songs: Song[], onPlay: (url: string) => void }) => {

    return (
        <ul>
            {songs.map(song => (
                <li key={song.id}>
                    {song.name}-{song.genre}
                    <button onClick={() => onPlay(song?.songUrl?? "no url")}>▶️ Play</button>
                    <a href={song.songUrl} download><button>⬇️ Download</button></a>
                </li>
            ))}
        </ul>
    )

}
export default SongsList;