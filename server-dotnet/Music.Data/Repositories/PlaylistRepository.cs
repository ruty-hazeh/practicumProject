using Music.Core.Models;
using Music.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music.Data.Repositories
{
    public class PlaylistRepository : IPlaylistRepository
    {
        private readonly DataContext _context;

        public PlaylistRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Playlist>> GetAllAsync()
        {
            return await _context.Playlists
                .Include(p => p.Songs)
                .ToListAsync();
        }

        public async Task<Playlist> GetByIdAsync(int id)
        {
            return await _context.Playlists
                .Include(p => p.Songs)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<bool> AddSongToPlaylistAsync(int playlistId, int songId)
        {
            var playlist = await _context.Playlists
                .Include(p => p.Songs)
                .FirstOrDefaultAsync(p => p.Id == playlistId);
            if (playlist == null)
                return false;

            var song = await _context.Songs.FindAsync(songId);
            if (song == null)
                return false;

            if (!playlist.Songs.Any(s => s.Id == songId))
            {
                playlist.Songs.Add(song);
                await _context.SaveChangesAsync();
            }

            return true;
        }

        public async Task<Playlist> AddAsync(Playlist playlist)
        {
            await _context.Playlists.AddAsync(playlist);
            await _context.SaveChangesAsync();
            return playlist;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var playlist = await _context.Playlists.FindAsync(id);
            if (playlist == null)
                return false;

            _context.Playlists.Remove(playlist);
            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<bool> RemoveSongFromPlaylistAsync(int playlistId, int songId)
        {
            var playlist = await _context.Playlists
                .Include(p => p.Songs)
                .FirstOrDefaultAsync(p => p.Id == playlistId);

            if (playlist == null) return false;

            var song = playlist.Songs.FirstOrDefault(s => s.Id == songId);
            if (song == null) return false;

            playlist.Songs.Remove(song);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Playlist> UpdateAsync(Playlist playlist)
        {
            var existing = await _context.Playlists
                .Include(p => p.Songs)
                .FirstOrDefaultAsync(p => p.Id == playlist.Id);

            if (existing == null)
                return null;

            existing.Name = playlist.Name;
            existing.Songs = playlist.Songs;

            await _context.SaveChangesAsync();
            return existing;
        }
    }
}
