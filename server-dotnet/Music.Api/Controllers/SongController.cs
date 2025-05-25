using Microsoft.AspNetCore.Mvc;
using Music.Core.Models;
using Music.Core.Services;
using Music.Service;
using Music.Core.Dtos;
using Microsoft.AspNetCore.Authorization;
using System.Data;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Music.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongController : ControllerBase
    {
        private readonly ISongService _songService;
        public SongController(ISongService songService)
        {
            _songService = songService;
        }


        [HttpGet]
        public async Task<IEnumerable<Song>> GetAll()
        {
            return await _songService.GetAllAsync();
        }

        [HttpGet("song/{id:int}")]
        public async Task<ActionResult<Song>> GetById(int id)
        {
            var song = await _songService.GetByIdAsync(id);
            if (song == null) return NotFound();
            return song;
        }
        [HttpGet("by-genre/{genre}")]
        public async Task<ActionResult<IEnumerable<Song>>> GetByGenre(string genre)
        {
            var songs = await _songService.GetByGenreAsync(genre);
            if (songs == null || !songs.Any())
                return NotFound();

            return Ok(songs);
        }


        [HttpGet("by-name/{name}")]
        public async Task<ActionResult<Song>> GetByName(string name)
        {
            var song = await _songService.GetByNameAsync(name);
            if (song == null) return NotFound();
            return song;
        }
        [HttpGet("genres")]
        public async Task<IActionResult> GetAllGenres()
        {
            var genres = await _songService.GetAllGenresAsync();
            return Ok(genres);
        }


        //[Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Song>> Add([FromBody] SongDTO song)
        {
            Song s = await _songService.AddAsync(song);
            return Ok(s);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SongDTO song)
        {
            Song s = await _songService.UpdateAsync(id,song);
            if (s == null)
            {
                return NotFound();
            }
            return Ok(s);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _songService.DeleteAsync(id);
            return NoContent();
        }



        //[HttpPost("create-ai")]
        //public async Task<ActionResult<IEnumerable<SongAIResponseDto>>> CreateSongAI([FromBody] CreateSongAIRequest request)
        //{
        //    if (string.IsNullOrWhiteSpace(request.Prompt))
        //        return BadRequest("Prompt is required.");

        //    var songs = await _songService.GenerateSongsByAIAsync(request.Prompt);
        //    return Ok(songs);
        //}
    }
}
