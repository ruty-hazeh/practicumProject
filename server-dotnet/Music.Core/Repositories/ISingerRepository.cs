using Music.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.Core.Repositories
{
    public interface ISingerRepository
    {
       public Task<IEnumerable<Singer>> GetAllAsync();
        public Task<Singer> GetByIdAsync(int id);
        public Task<Singer> AddAsync(Singer singer);
        public Task<Singer> UpdateAsync(int id,Singer singer);
        public Task DeleteAsync(int id);
    }


}
