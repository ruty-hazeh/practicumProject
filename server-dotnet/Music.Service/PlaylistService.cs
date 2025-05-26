using AutoMapper;
using Microsoft.Extensions.Configuration;
using Music.Core.Dtos;
using Music.Core.Models;
using Music.Core.Repositories;
using Music.Core.Services;
using Music.Data.Repositories;
using SendGrid.Helpers.Mail;
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
        private const string OpenAiUrl = "https://api.openai.com/v1/chat/completions";
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
        public async Task<Playlist> GetPlaylistByIdAsync(int id) => await _repo.GetByIdAsync(id);


        public async Task<Playlist> GetByIdAsync(int id) => await _repo.GetByIdAsync(id);
        public async Task<bool> AddSongToPlaylistAsync(int playlistId, int songId) => await _repo.AddSongToPlaylistAsync(playlistId, songId);
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



        public async Task<Playlist> GenerateSmartPlaylistAsync(int userId, string moodText)
        {
            // שליפת כל הז'אנרים הקיימים במערכת
            var availableGenres = await _songRepo.GetAllGenresAsync();

            // שליחת מצב רוח + רשימת ז'אנרים ל־AI ובחירת ז'אנר אחד
            var bestGenre = await GetBestGenreFromAI(moodText, availableGenres);

            if (string.IsNullOrWhiteSpace(bestGenre))
                throw new Exception("לא זוהה ז'אנר מתאים לפי מצב הרוח.");

            if (!availableGenres.Any(g => string.Equals(g, bestGenre, StringComparison.OrdinalIgnoreCase)))
                throw new Exception("הז'אנר שחזר מה־AI אינו קיים במערכת.");

            // שליפת כל השירים התואמים לז'אנר הנבחר
            var matchedSongs = await _songRepo.GetByGenreAsync(bestGenre);

            if (!matchedSongs.Any())
                throw new Exception("לא נמצאו שירים מתאימים בז׳אנר שזוהה.");

            // בחירת עד 10 שירים רנדומליים
            var selectedSongs = matchedSongs
                .OrderBy(x => Random.Shared.Next())
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

        //        private async Task<string> GetBestGenreFromAI(string moodText, List<string> existingGenres)
        //        {
        //            using var client = new HttpClient();
        //            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {_openAiKey}");

        //            var prompt = $@"
        //מצב רוח: {moodText}
        //מתוך הז'אנרים הבאים: {string.Join(", ", existingGenres)}
        //בחר את הז'אנר הכי מתאים בלבד מתוך הרשימה. החזר אותו בדיוק כפי שהוא מופיע, ללא מילים נוספות.
        //";

        //            var requestBody = new
        //            {
        //                model = "gpt-3.5-turbo",
        //                messages = new[]
        //                {
        //            new { role = "system", content = "אתה בוחר ז'אנר אחד בלבד מתוך הרשימה שנשלחת אליך." },
        //            new { role = "user", content = prompt }
        //        }
        //            };
        //            var requestJson = new StringContent(
        //    JsonSerializer.Serialize(requestBody),
        //    Encoding.UTF8,
        //    "application/json");
        //            using var request = new HttpRequestMessage(HttpMethod.Post, OpenAiUrl);
        //            request.Headers.Add("Authorization", $"Bearer {_openAiKey}");
        //            request.Content = requestJson;

        //            var res = await client.SendAsync(request);

        //            //if (!res.IsSuccessStatusCode)
        //            //    throw new Exception($"OpenAI request failed with status {res.StatusCode}");

        //            var json = await res.Content.ReadFromJsonAsync<JsonElement>();

        //            //if (!json.TryGetProperty("choices", out var choices) ||
        //            //    choices.GetArrayLength() == 0 ||
        //            //    !choices[0].TryGetProperty("message", out var message) ||
        //            //    !message.TryGetProperty("content", out var content))
        //            //{
        //            //    throw new Exception("Invalid response structure from OpenAI.");
        //            //}

        //            return Content.GetString()?.Trim();
        //        }


        private async Task<string> GetBestGenreFromAI(string moodText, List<string> existingGenres)
        {
            using var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {_openAiKey}");

            var prompt = $@"
מצב רוח: {moodText}
מתוך הז'אנרים הבאים: {string.Join(", ", existingGenres)}
בחר את הז'אנר הכי מתאים בלבד מתוך הרשימה. החזר אותו בדיוק כפי שהוא מופיע, ללא מילים נוספות.
";

            var requestBody = new
            {
                model = "gpt-4o-mini",
                //model = "gpt-3.5-turbo",
                messages = new[]
                {
            new { role = "system", content = "אתה בוחר ז'אנר אחד בלבד מתוך הרשימה שנשלחת אליך." },
            new { role = "user", content = prompt }
        }
            };

            var requestJson = new StringContent(
                JsonSerializer.Serialize(requestBody),
                Encoding.UTF8,
                "application/json");

            using var response = await client.PostAsync(OpenAiUrl, requestJson);

            //if (!response.IsSuccessStatusCode)
            //    throw new Exception($"OpenAI request failed with status {response.StatusCode}");

            var rawResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine("RAW RESPONSE:\n" + rawResponse);
            var json = JsonSerializer.Deserialize<JsonElement>(rawResponse);


            if (!json.TryGetProperty("choices", out var choices) ||
                choices.GetArrayLength() == 0 ||
                !choices[0].TryGetProperty("message", out var message) ||
                !message.TryGetProperty("content", out var content))
            {
                throw new Exception("Invalid response structure from OpenAI.");
            }

            return content.GetString()?.Trim();
        }

    }

}

