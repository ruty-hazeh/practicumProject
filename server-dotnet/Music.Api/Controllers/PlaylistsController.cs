using Microsoft.AspNetCore.Mvc;
using Music.Core.Dtos;
using Music.Core.Models;
using Music.Core.Services;
using System.Security.Claims;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Music.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistsController : ControllerBase
    {
        private readonly IPlaylistService _playlistService;

        public PlaylistsController(IPlaylistService playlistService)
        {
            _playlistService = playlistService;
        }

        [HttpGet]
        //public async Task<IActionResult> GetAll() =>
        //    Ok(await _playlistService.GetAllAsync());


        public async Task<IActionResult> GetAll()
        {
            var playlists = await _playlistService.GetAllAsync();
            var dtoList = playlists.Select(p => new Playlist
            {
                Id = p.Id,
                Name = p.Name,
                Songs = p.Songs,
                UserId = p.UserId
            });
            return Ok(dtoList);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Playlist>> GetPlaylistById(int id)
        {
            var playlist = await _playlistService.GetPlaylistByIdAsync(id);
            if (playlist == null) return NotFound();
            return Ok(playlist);
        }


        [HttpPost]

        public async Task<IActionResult> Create([FromBody] PlaylistDTO dto)
        {
            //dto.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var playlist = await _playlistService.CreateAsync(dto);
            return Ok(playlist);
        }

        [HttpPost("{id}/songs")]
        public async Task<IActionResult> AddSongToPlaylist(int id, [FromBody] AddSongRequest request)
        {
            var success = await _playlistService.AddSongToPlaylistAsync(id, request.SongId);
            if (!success) return NotFound();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _playlistService.DeleteAsync(id);
            if (!success) return NotFound();
            return Ok();
        }

        [HttpDelete("{playlistId}/songs/{songId}")]
        public async Task<IActionResult> DeleteSongFromPlaylist(int playlistId, int songId)
        {
            var result = await _playlistService.RemoveSongFromPlaylistAsync(playlistId, songId);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpPost("smart")]
        public async Task<IActionResult> GenerateSmart(int userId,[FromBody] SmartPlaylistRequest req)
        {
            var playlist = await _playlistService.GenerateSmartPlaylistAsync(userId,req.MoodText);
            if (playlist == null) return BadRequest("לא ניתן ליצור פלייליסט חכם");
            return Ok(playlist);
        }
    }
}