using Music.Core.Models;
using Music.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Music.Data.Repositories
{
    public class SingerRepository : ISingerRepository
    {
        private readonly DataContext _context;
        public SingerRepository(DataContext context) { _context = context; }

        public async Task<IEnumerable<Singer>> GetAllAsync() => await _context.Singers.Include(s=>s.Songs).ToListAsync();

        public async Task<Singer> GetByIdAsync(int id) => await _context.Singers.FindAsync(id);

        public async Task<Singer> GetByNameAsync(string name) => await _context.Singers.FirstOrDefaultAsync(s => s.Name.ToLower() == name.ToLower().Trim());

        public async Task<Singer> AddAsync(Singer entity) {

            await _context.Singers.AddAsync(entity); 
            await _context.SaveChangesAsync(); 
            return entity;
        }

        public async Task<Singer> UpdateAsync(int id,Singer entity) {
            Singer s= await _context.Singers.SingleOrDefaultAsync(act => act.Id == id);
            if (s == null) return null;
            else
            {
               
                s.Name = entity.Name;
                s.Songs = entity.Songs;
                
            }
            await _context.SaveChangesAsync();
            return s;
        }


        public async Task DeleteAsync(int id) { var entity = await _context.Singers.FindAsync(id); if (entity != null) { _context.Singers.Remove(entity); await _context.SaveChangesAsync(); } }
    }
}
