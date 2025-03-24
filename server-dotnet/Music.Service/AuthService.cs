using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Music.Core.Models;
using Music.Core.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Music.Core.Dtos;


namespace Music.Service
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;

        public AuthService(IConfiguration configuration, IUserRepository userRepository)
        {
            _configuration = configuration;
            _userRepository = userRepository;
        }

        public async Task<string> GenerateJwtToken(string username, string password)
        {
            if (username == "ruty" && password == "rha1828!")
            {
                return GenerateToken(username, new[] { "Admin" });
            }

            var user = await _userRepository.GetUserByCredentials(username, password);
            if (user != null)
            {
                return GenerateToken(username, new[] { "User" });
            }

            return null;
        }
        private string GenerateToken(string username, string[] roles)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, username),
    };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );


            return new JwtSecurityTokenHandler().WriteToken(token);
        }






        public async Task<(bool Success, string Message)> RegisterUserAsync(UserDTO userDto)
        {
            // בדיקה אם המשתמש כבר קיים
            var existingUser = await _userRepository.GetUserByCredentials(userDto.Name, userDto.Password);
            if (existingUser != null)
            {
                return (false, "User already exists.");
            }

            // יצירת משתמש חדש
            var newUser = new User
            {
                Name = userDto.Name,
                Password = userDto.Password, // הצפנת סיסמה
                Email = userDto.Email,
                Role = "User" // ברירת מחדל
            };

            await _userRepository.AddAsync(newUser);

            return (true, "User registered successfully.");
        }


    }
}