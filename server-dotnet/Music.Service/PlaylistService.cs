using AutoMapper;
using Microsoft.Extensions.Configuration;
using Music.Core.Dtos;
using Music.Core.Models;
using Music.Core.Repositories;
using Music.Core.Services;
using Music.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Music.Service
{
    public class PlaylistService : IPlaylistService
    {
        private readonly IPlaylistRepository _repo;
        private readonly ISongRepository _songRepo;
        private readonly IMapper _mapper;
        private readonly string _openAiKey;
        private readonly IConfiguration _config;
        public PlaylistService(IPlaylistRepository repo, ISongRepository songRepo, IMapper mapper, IConfiguration config)
        {
            _repo = repo;
            _songRepo = songRepo;
            _mapper = mapper;
            _config = config;
            _openAiKey = config["OpenAI:ApiKey"];
            if (string.IsNullOrEmpty(_openAiKey))
            {
                throw new Exception("OpenAI API key is missing in configuration.");
            }

        }

        public async Task<IEnumerable<Playlist>> GetAllAsync() => await _repo.GetAllAsync();
        public async Task<Playlist> GetPlaylistByIdAsync(int id)=> await _repo.GetByIdAsync(id);


        public async Task<Playlist> GetByIdAsync(int id) => await _repo.GetByIdAsync(id);
        public async Task<bool> AddSongToPlaylistAsync(int playlistId, int songId)=> await _repo.AddSongToPlaylistAsync(playlistId, songId);    
        public async Task<Playlist> CreateAsync(PlaylistDTO dto)
        {
            var songs = new List<Song>();
          if (dto == null) throw new Exception("PlaylistDTO cannot be null");  

            if (dto.SongIds != null && dto.SongIds.Any())
            {
                foreach (var songId in dto.SongIds)
                {
                    var song = await _songRepo.GetByIdAsync(songId);
                    if (song != null)
                        songs.Add(song);
                }
            }
           
            var playlist = new Playlist
            {
                Name = dto.Name,
                Songs = songs,
                UserId = dto.UserId
            };

            return await _repo.AddAsync(playlist);
        }

        public async Task<bool> DeleteAsync(int id) => await _repo.DeleteAsync(id);
        public async Task<bool> RemoveSongFromPlaylistAsync(int playlistId, int songId)
        {
            return await _repo.RemoveSongFromPlaylistAsync(playlistId, songId);
        }

        //public async Task<Playlist> GenerateSmartPlaylistAsync(int userId,string moodText)
        //{
        //    // קבלת ז'אנרים מה-AI לפי מצב הרוח
        //    var genres = await GetGenresFromAI(moodText);

        //    // קבלת כל השירים
        //    var allSongs = await _songRepo.GetAllAsync();

        //    // סינון שירים התואמים לז'אנרים
        //    var matched = allSongs.Where(s => genres.Contains(s.Genre)).Take(5).ToList();

        //    // יצירת פלייליסט חדש
        //    var playlist = new Playlist
        //    {
        //        Name = $"Smart Playlist - {DateTime.Now:yyyyMMddHHmmss}",
        //        Songs = matched,
        //        UserId=userId
        //        // הוסף שדות נוספים לפי הצורך, למשל UserId אם יש
        //    };

        //    // שמירת הפלייליסט בבסיס
        //    await _repo.AddAsync(playlist);

        //    return playlist;
        //}


        //        public async Task<Playlist> GenerateSmartPlaylistAsync(int userId, string moodText)
        //        {
        //            // שליפת כל הז'אנרים הקיימים במערכת
        //            var availableGenres = await _songRepo.GetAllGenresAsync();

        //            // קבלת ז'אנרים מהמכונה - לפי מצב הרוח
        //            var suggestedGenres = await GetGenresFromAI(moodText);

        //            // מיפוי הז'אנרים שה-AI החזיר לאלו שבאמת קיימים במערכת
        //            var matchedGenres = suggestedGenres
        //                .Where(g => availableGenres.Contains(g, StringComparer.OrdinalIgnoreCase))
        //                .Distinct()
        //                .ToList();

        //            if (!matchedGenres.Any())
        //                throw new Exception("לא נמצאו ז'אנרים מתאימים לפי מצב הרוח שזוהה.");

        //            // שליפת כל השירים התואמים לז'אנרים שנבחרו
        //            var matchedSongs = await _songRepo.GetByGenreAsync(matchedGenres);

        //            if (!matchedSongs.Any())
        //                throw new Exception("לא נמצאו שירים מתאימים בז׳אנרים המזוהים.");

        //            // בחירת עד 10 שירים רנדומליים
        //            var random = new Random();
        //            var selectedSongs = matchedSongs
        //                .OrderBy(x => random.Next())
        //                .Take(10)
        //                .ToList();

        //            // יצירת פלייליסט
        //            var playlist = new Playlist
        //            {
        //                Name = $"Smart Playlist - {DateTime.Now:yyyyMMddHHmmss}",
        //                Songs = selectedSongs,
        //                UserId = userId
        //            };

        //            await _repo.AddAsync(playlist);

        //            return playlist;
        //        }


        //        private async Task<List<string>> GetGenresFromAI(string moodText)
        //        {
        //            using var client = new HttpClient();
        //            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {_openAiKey}");
        //            var body = new
        //            {
        //                model = "gpt-3.5-turbo",
        //                messages = new[] {
        //            new { role = "system", content = "אתה ממפה טקסט של מצב רוח לז׳אנרים מוזיקליים. החזר רק רשימת ז׳אנרים." },
        //            new { role = "user", content = moodText }
        //        }
        //            };

        //            var res = await client.PostAsJsonAsync("https://api.openai.com/v1/chat/completions", body);

        //            if (!res.IsSuccessStatusCode)
        //            {
        //                // אפשר ללוג או לזרוק שגיאה מותאמת
        //                throw new Exception($"OpenAI request failed with status {res.StatusCode}");
        //            }

        //            var json = await res.Content.ReadFromJsonAsync<JsonElement>();

        //            if (!json.TryGetProperty("choices", out JsonElement choices) || choices.GetArrayLength() == 0)
        //            {
        //                throw new Exception("OpenAI response missing choices");
        //            }

        //            var firstChoice = choices[0];

        //            if (!firstChoice.TryGetProperty("message", out JsonElement message) ||
        //                !message.TryGetProperty("content", out JsonElement content))
        //            {
        //                throw new Exception("OpenAI response missing message content");
        //            }

        //            var text = content.GetString();

        //            if (string.IsNullOrWhiteSpace(text))
        //            {
        //                throw new Exception("OpenAI returned empty content");
        //            }

        //            return text.Split(',')
        //                       .Select(s => s.Trim())
        //                       .Where(s => !string.IsNullOrEmpty(s))
        //                       .ToList();
        //        }

        public async Task<Playlist> GenerateSmartPlaylistAsync(int userId, string moodText)
        {
            // שליפת כל הז'אנרים הקיימים במערכת
            var availableGenres = await _songRepo.GetAllGenresAsync();

            // שליחת מצב רוח + רשימת ז'אנרים ל־AI ובחירת ז'אנר אחד
            var bestGenre = await GetBestGenreFromAI(moodText, availableGenres);

            if (string.IsNullOrWhiteSpace(bestGenre))
                throw new Exception("לא זוהה ז'אנר מתאים לפי מצב הרוח.");

            if (!availableGenres.Contains(bestGenre, StringComparer.OrdinalIgnoreCase))
                throw new Exception("הז'אנר שחזר מה־AI אינו קיים במערכת.");

            // שליפת כל השירים התואמים לז'אנר הנבחר
            var matchedSongs = await _songRepo.GetByGenreAsync(bestGenre);

            if (!matchedSongs.Any())
                throw new Exception("לא נמצאו שירים מתאימים בז׳אנר שזוהה.");

            // בחירת עד 10 שירים רנדומליים
            var random = new Random();
            var selectedSongs = matchedSongs
                .OrderBy(x => random.Next())
                .Take(10)
                .ToList();

            // יצירת פלייליסט
            var playlist = new Playlist
            {
                Name = $"Smart Playlist - {DateTime.Now:yyyyMMddHHmmss}",
                Songs = selectedSongs,
                UserId = userId
            };

            await _repo.AddAsync(playlist);

            return playlist;
        }


        private async Task<string> GetBestGenreFromAI(string moodText, List<string> existingGenres)
        {
            using var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {_openAiKey}");

            var prompt = $@"
מצב רוח: {moodText}
מתוך הז'אנרים הבאים: {string.Join(", ", existingGenres)}
בחר רק את הז'אנר הכי מתאים אחד בלבד והחזר אותו כטקסט.
";

            var body = new
            {
                model = "gpt-3.5-turbo",
                messages = new[] {
            new { role = "system", content = "אתה בוחר ז'אנר אחד בלבד מתוך רשימה קיימת לפי מצב רוח." },
            new { role = "user", content = prompt }
        }
            };

            var res = await client.PostAsJsonAsync("https://api.openai.com/v1/chat/completions", body);

            if (!res.IsSuccessStatusCode)
                throw new Exception($"OpenAI request failed with status {res.StatusCode}");

            var json = await res.Content.ReadFromJsonAsync<JsonElement>();
            var text = json.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

            return text?.Trim();
        }


    }

}

