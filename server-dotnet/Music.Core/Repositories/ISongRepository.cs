using Music.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.Core.Repositories
{
    public interface ISongRepository
    {
        public Task<IEnumerable<Song>> GetAllAsync();
        public Task<Song> GetByIdAsync(int id);
        public Task<IEnumerable<Song>> GetByGenreAsync(string genre);
        public Task<Song> GetByNameAsync(string name);
        Task<List<string>> GetAllGenresAsync();

        public Task<Song> AddAsync(Song song);
        public Task<Song> UpdateAsync(int id, Song song);
        public Task DeleteAsync(int id);
    }
}
