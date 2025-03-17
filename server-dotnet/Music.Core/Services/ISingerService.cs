using Music.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Music.Core.Dtos;
namespace Music.Core.Services
{
    public interface ISingerService
    {
        public Task<IEnumerable<Singer>> GetAllAsync();
        public Task<Singer> GetByIdAsync(int id);
        public Task<Singer> AddAsync(SingerDTO singer);
        public Task<Singer> UpdateAsync(int id,SingerDTO singer);
        public Task DeleteAsync(int id);

    }
}
