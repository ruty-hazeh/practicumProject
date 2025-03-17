using Microsoft.AspNetCore.Mvc;
using Music.Core.Models;
using Music.Core.Services;
using Music.Service;
using Music.Core.Dtos;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<Song>> GetById(int id)
        {
            var song = await _songService.GetByIdAsync(id);
            if (song == null) return NotFound();
            return song;
        }
        [HttpPost]
        public async Task<ActionResult<Song>> Add([FromBody] SongDTO song)
        {
            Song s = await _songService.AddAsync(song);
            return Ok(s);
        }


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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _songService.DeleteAsync(id);
            return NoContent();
        }
    }
}
