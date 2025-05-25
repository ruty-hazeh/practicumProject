using Music.Core.Models;

namespace Music.Core.Repositories
{
    public interface IPlaylistRepository
    {
        Task<IEnumerable<Playlist>> GetAllAsync();

        Task<Playlist> GetByIdAsync(int id);
        Task<bool> AddSongToPlaylistAsync(int playlistId, int songId);
        Task<Playlist> AddAsync(Playlist playlist);
        Task<bool> DeleteAsync(int id);
        Task<bool> RemoveSongFromPlaylistAsync(int playlistId, int songId);
        Task<Playlist> UpdateAsync(Playlist playlist);


    }
}
