using Microsoft.AspNetCore.Mvc;
using Music.Core.Dtos;
using Music.Core.Models;
using Music.Core.Repositories;
using Music.Data.Repositories;
using Music.Service;

namespace Music.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly IUserRepository _userRepository;

        public AuthController(AuthService authService,IUserRepository userRepository)
        {
            _authService = authService;
            _userRepository = userRepository;
        }

        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] LoginModel model)
        //{
        //    if (model == null || string.IsNullOrWhiteSpace(model.Name) || string.IsNullOrWhiteSpace(model.Password))
        //    {
        //        return BadRequest(new { message = "Invalid request data" });
        //    }

        //    var token = await _authService.GenerateJwtToken(model.Name, model.Password);

        //    if (string.IsNullOrEmpty(token))
        //    {
        //        return Unauthorized(new { message = "Invalid credentials" });
        //    }

        //    return Ok(new { token });
        //}

        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] UserDTO userDto)
        //{
        //    if (userDto == null || string.IsNullOrWhiteSpace(userDto.Name) || string.IsNullOrWhiteSpace(userDto.Password) || string.IsNullOrWhiteSpace(userDto.Email))
        //    {
        //        return BadRequest(new { message = "All fields are required" });
        //    }

        //    var result = await _authService.RegisterUserAsync(userDto);
        //    if (!result.Success)
        //    {
        //        return BadRequest(new { message = result.Message });
        //    }

        //    var token = await _authService.GenerateJwtToken(userDto.Name, userDto.Password);
        //    return Ok(new { message = "Registration successful!", token });
        //}
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.Name) || string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest(new { message = "Invalid request data" });
            }

            var token = await _authService.GenerateJwtToken(model.Name, model.Password);
            var user = await _userRepository.GetUserByCredentials(model.Name, model.Password);

            if (string.IsNullOrEmpty(token) || user == null)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            return Ok(new
            {
                token,
                message = "Login successful",
                user = new
                {
                    id = user.Id,
                    name = user.Name,
                    email = user.Email
                }
            });
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDTO userDto)
        {
            if (userDto == null || string.IsNullOrWhiteSpace(userDto.Name) ||
                string.IsNullOrWhiteSpace(userDto.Password) ||
                string.IsNullOrWhiteSpace(userDto.Email))
            {
                return BadRequest(new { message = "All fields are required" });
            }

            var (success, message, user) = await _authService.RegisterUserAsync(userDto);
            if (!success || user == null)
            {
                return BadRequest(new { message });
            }

            var token = await _authService.GenerateJwtToken(userDto.Name, userDto.Password);

            return Ok(new
            {
                message = "Registration successful!",
                token,
                user = new
                {
                    id = user.Id,
                    name = user.Name,
                    email = user.Email
                }
            });
        }
    }
}
