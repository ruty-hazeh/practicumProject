using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Music.Core.Models;
using Music.Core.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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
            // חשבון אדמין ב-hardcoded
            if (username == "ruty" && password == "rha1828!")
            {
                var adminUser = new User
                {
                    Id = 1,
                    Name = "ruty",
                    Email = "rutyh1828@gmail.com",
                    Role = "Admin"
                };

                return GenerateToken(adminUser, new[] { "Admin" });
            }

            var user = await _userRepository.GetUserByCredentials(username, password);
            if (user != null)
            {
                return GenerateToken(user, new[] {  "User" });
            }

            return null;
        }

        private string GenerateToken(User user, string[] roles)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email ?? "")
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

        //public async Task<(bool Success, string Message)> RegisterUserAsync(UserDTO userDto)
        //{
        //    var existingUser = await _userRepository.GetUserByCredentials(userDto.Name, userDto.Password);
        //    if (existingUser != null)
        //    {
        //        return (false, "User already exists.");
        //    }

        //    var newUser = new User
        //    {
        //        Name = userDto.Name,
        //        Password = userDto.Password,
        //        Email = userDto.Email,
        //        Role = "User"
        //    };

        //    await _userRepository.AddAsync(newUser);

        //    return (true, "User registered successfully.");
        //}

        public async Task<(bool Success, string Message, User? CreatedUser)> RegisterUserAsync(UserDTO userDto)
        {
            var existingUser = await _userRepository.GetUserByCredentials(userDto.Name, userDto.Password);
            if (existingUser != null)
            {
                return (false, "User already exists.", null);
            }

            var newUser = new User
            {
                Name = userDto.Name,
                Password = userDto.Password,
                Email = userDto.Email,
                Role = "User"
            };

            await _userRepository.AddAsync(newUser);

            return (true, "User registered successfully.", newUser);
        }
    }
}
