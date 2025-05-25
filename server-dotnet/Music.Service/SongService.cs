using Music.Core.Models;
using Music.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Music.Data.Repositories;
using Music.Core.Services;
using Music.Core.Dtos;
using System.Reflection;
using AutoMapper;

namespace Music.Service

{
    public class SongService: ISongService
    {
        private readonly ISongRepository _songRepository;
        private readonly IMapper _mapper;

        public SongService(ISongRepository songRepository, IMapper mapper)
        {
            _songRepository = songRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Song>> GetAllAsync() => await _songRepository.GetAllAsync();
        public async Task<Song> GetByIdAsync(int id) => await _songRepository.GetByIdAsync(id);
        public async Task<IEnumerable<Song>> GetByGenreAsync(string genre) => (IEnumerable<Song>)await _songRepository.GetByGenreAsync(genre);
 
        public async Task<Song> GetByNameAsync(string name)=> await _songRepository.GetByNameAsync(name);

        public async Task<List<string>> GetAllGenresAsync()
        {
            return await _songRepository.GetAllGenresAsync();
        }

        public async Task<Song> AddAsync(SongDTO song)
        {
            var songMap = _mapper.Map<Song>(song);

            return await _songRepository.AddAsync(songMap);
        }
        public async Task<Song> UpdateAsync(int id,SongDTO song)
        {
            var songMap = _mapper.Map<Song>(song);
            return await _songRepository.UpdateAsync(id,songMap);
        }
        public async Task DeleteAsync(int id) => await _songRepository.DeleteAsync(id);

        //public async Task<IEnumerable<SongAIResponseDto>> GenerateSongsByAIAsync(string prompt)
        //{
        //    // כאן תעבירי את הבקשה ל-OpenAI או שירות אחר לפי הלוגיקה שלך
        //    // כרגע נחזיר רשימה דמה

        //    // לדוגמא:
        //    var dummyList = new List<SongAIResponseDto>()
        //{
        //    new SongAIResponseDto { Id = 1, Name = "AI Song 1", SongUrl = "https://your-s3-link/song1.mp3", Genre = "Pop", SingerName = "AI Singer" },
        //    new SongAIResponseDto { Id = 2, Name = "AI Song 2", SongUrl = "https://your-s3-link/song2.mp3", Genre = "Rock", SingerName = "AI Band" },
        //};

        //    return await Task.FromResult(dummyList);
        //}
    }
}

