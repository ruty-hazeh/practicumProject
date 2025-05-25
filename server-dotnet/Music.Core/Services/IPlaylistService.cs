using Music.Core.Dtos;
using Music.Core.Models;


namespace Music.Core.Services
{
    public interface IPlaylistService
    {
        Task<IEnumerable<Playlist>> GetAllAsync();
        Task<Playlist> GetPlaylistByIdAsync(int id);
        Task<Playlist> GetByIdAsync(int id);
        Task<bool> AddSongToPlaylistAsync(int playlistId, int songId);
        Task<Playlist> CreateAsync(PlaylistDTO playlistDto);
        Task<bool> DeleteAsync(int id);
        Task<bool> RemoveSongFromPlaylistAsync(int playlistId, int songId);
        Task<Playlist> GenerateSmartPlaylistAsync(int userId,string moodText);
    }
}
