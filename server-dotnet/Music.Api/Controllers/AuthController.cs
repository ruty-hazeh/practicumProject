using Microsoft.AspNetCore.Mvc;
using Music.Core.Models;
using Music.Service;
using Music.Core.Dtos;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Music.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

<<<<<<< HEAD
        //        [HttpPost("login")]
        //        public async Task<IActionResult> Login([FromBody] LoginModel model)
        //        {
        //            var token = await _authService.GenerateJwtToken(model.Name, model.Password);

        //            if (token == null)
        //            {
        //                return Unauthorized(new { message = "Invalid credentials" });  // שיפור של הודעת השגיאה
        //            }

        //            return Ok(new { token });  // החזרת ה-token במקום במבנה עם שם המפתח Token
        //        }

        //        [HttpPost("register")]
        //        public async Task<IActionResult> Register([FromBody] UserDTO userDto)
        //        {
        //            var result = await _authService.RegisterUserAsync(userDto);
        //            if (!result.Success)
        //            {
        //                return BadRequest(new { message = result.Message });
        //            }

        //            var token = await _authService.GenerateJwtToken(userDto.Name, userDto.Password);

        //            return Ok(new { message = "Registration successful!", token }); // החזרת token עם הודעת הצלחה
        //        }
        //    }
        //}


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.Name) || string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest(new { message = "Invalid request data" });
            }

            var token = await _authService.GenerateJwtToken(model.Name, model.Password);

            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            return Ok(new { token });
=======
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var token = await _authService.GenerateJwtToken(model.Name, model.Password);

            if (token == null)
            {
                return Unauthorized(new { message = "Invalid credentials" });  // שיפור של הודעת השגיאה
            }

            return Ok(new { token });  // החזרת ה-token במקום במבנה עם שם המפתח Token
>>>>>>> 6c7abeb13d69ecc6d66b374575ad64ce3426adf2
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDTO userDto)
        {
<<<<<<< HEAD
            if (userDto == null || string.IsNullOrWhiteSpace(userDto.Name) || string.IsNullOrWhiteSpace(userDto.Password) || string.IsNullOrWhiteSpace(userDto.Email))
            {
                return BadRequest(new { message = "All fields are required" });
            }

=======
>>>>>>> 6c7abeb13d69ecc6d66b374575ad64ce3426adf2
            var result = await _authService.RegisterUserAsync(userDto);
            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            var token = await _authService.GenerateJwtToken(userDto.Name, userDto.Password);

<<<<<<< HEAD
            return Ok(new { message = "Registration successful!", token });
        }
    }
}
=======
            return Ok(new { message = "Registration successful!", token }); // החזרת token עם הודעת הצלחה
        }
    }
}
>>>>>>> 6c7abeb13d69ecc6d66b374575ad64ce3426adf2
