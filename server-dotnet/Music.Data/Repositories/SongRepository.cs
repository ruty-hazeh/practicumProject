using Music.Core.Models;
using Music.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Music.Data.Repositories
{

    public class SongRepository : ISongRepository
    {
        private readonly DataContext _context;
        public SongRepository(DataContext context) { _context = context; }

        public async Task<IEnumerable<Song>> GetAllAsync() => await _context.songs.Include(s=>s.Singer).Include(s=>s.Users).ToListAsync();

        public async Task<Song> GetByIdAsync(int id) => await _context.songs.FindAsync(id);

        public async Task<IEnumerable<Song>> GetSongsByGenreAsync(string genre) => await _context.songs.Where(s => s.Genre == genre).ToListAsync();

        public async Task<Song> AddAsync(Song song) {
            await _context.songs.AddAsync(song); 
            await _context.SaveChangesAsync();
            return song;
        }

        public async Task<Song> UpdateAsync(int id,Song song) {
            Song s = await _context.songs.SingleOrDefaultAsync(act => act.Id == id);
            if (s == null) return null;
            else
            {
               
                s.Name = song.Name;
                s.Genre = song.Genre;
                s.Duration = song.Duration;
                s.SongUrl = song.SongUrl;
                s.ReleaseDate = song.ReleaseDate;
                s.Singer = song.Singer;
                s.SingerId = song.SingerId;
                s.Users = song.Users;

            }
            await _context.SaveChangesAsync();
            return s;

         }

        public async Task DeleteAsync(int id) { var entity = await _context.songs.FindAsync(id); if (entity != null) { _context.songs.Remove(entity); await _context.SaveChangesAsync(); } }
    }
}

