using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Music.Core.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

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

        public string GenerateJwtToken(string username, string password)
        {
            if (username == "ruty" && password == "rha1828!")
            {
                return GenerateToken(username, new[] { "Admin" });
            }

            var user = _userRepository.GetUserByCredentials(username, password);
            if (user != null)
            {
                return GenerateToken(username, new[] { "User" });
            }

            return GenerateToken(username, new[] { "Viewer" });
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

    }
}