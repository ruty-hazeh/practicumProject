
const MusicPlayer= ({ songUrl }:{songUrl:string}) => {
    return (
        <div>
            <h3>🎵 מתנגן עכשיו</h3>
            <audio controls src={songUrl} autoPlay />
        </div>
    );
};

export default MusicPlayer;