using Music.Core.Models;
using Music.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Music.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context) { _context = context; }

        public async Task<IEnumerable<User>> GetAllAsync() => await _context.users.Include(u=>u.Songs).ToListAsync();

        public async Task<User> GetByIdAsync(int id) => await _context.users.FindAsync(id);

        public async Task<User> GetByEmailAsync(string email) => await _context.users.FirstOrDefaultAsync(u => u.Email == email);

        public async Task<User> AddAsync(User entity) { 
            await _context.users.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<User> UpdateAsync(int id,User entity) {
            User u = await _context.users.SingleOrDefaultAsync(act => act.Id == id);
            if (u == null) return null;
            else
            {
               
                u.Name = entity.Name;
                u.Password = entity.Password;
                u.Email = entity.Email;
                u.Role = entity.Role;
                u.Songs = entity.Songs;

            }
            await _context.SaveChangesAsync();
            return u;

        }

        public async Task DeleteAsync(int id) { var entity = await _context.users.FindAsync(id); if (entity != null) { _context.users.Remove(entity); await _context.SaveChangesAsync(); } }
    }
}

