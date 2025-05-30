const MusicPlayer = ({ songUrl }: { songUrl: string }) => {
    if (!songUrl) return null;
    console.log("Trying to play song:", songUrl);
    return (
        <div>
            <h3>🎵 מתנגן עכשיו</h3>
            <audio controls src={songUrl} autoPlay onError={() => alert("Error playing song!")} />
            {/* <button onClick={() => document.querySelector("audio")?.play()}>▶️ הפעל שוב</button> */}
        </div>
    );
};

export default MusicPlayer;

