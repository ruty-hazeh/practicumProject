using Microsoft.AspNetCore.Mvc;

namespace Music.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestDbController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TestDbController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("check")]
        public async Task<IActionResult> CheckMySqlConnection()
        {
            try
            {
                var connectionString = _configuration.GetConnectionString("DefaultConnection");
                using var connection = new MySql.Data.MySqlClient.MySqlConnection(connectionString);
                await connection.OpenAsync();
                return Ok("✅ הצלחה: התחברת ל-MySQL!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"❌ שגיאה בחיבור ל-MySQL: {ex.Message}");
            }
        }
    }

}
