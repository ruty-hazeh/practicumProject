﻿using Music.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Music.Core.Dtos;

namespace Music.Core.Services
{
    public interface ISongService
    {
        public Task<IEnumerable<Song>> GetAllAsync();
        public Task<Song> GetByIdAsync(int id);
        public Task<IEnumerable<Song>> GetByGenreAsync(string genre);
        Task<List<string>> GetAllGenresAsync();

        public Task<Song> GetByNameAsync(string name);

        public Task<Song> AddAsync(SongDTO song);
        public  Task<Song> UpdateAsync(int id,SongDTO song);
        public Task DeleteAsync(int id);

        //public Task<IEnumerable<SongAIResponseDto>> GenerateSongsByAIAsync(string prompt);
    }
}
