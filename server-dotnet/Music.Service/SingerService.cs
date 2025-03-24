using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Music.Core.Services;
using Music.Core.Repositories;
using Music.Data.Repositories;
using Music.Core.Models;
using AutoMapper;
using System.Diagnostics;
using Music.Core.Dtos;
namespace Music.Service
{
    public class SingerService:ISingerService
    {
        private readonly ISingerRepository _singerRepository;
        private readonly IMapper _mapper;

        public SingerService(ISingerRepository singerRepository, IMapper mapper)
        {
            _singerRepository = singerRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Singer>> GetAllAsync() => await _singerRepository.GetAllAsync();
        public async Task<Singer> GetByIdAsync(int id) => await _singerRepository.GetByIdAsync(id);
        public async Task<Singer> GetByNameAsync(string name) => await _singerRepository.GetByNameAsync(name);
        public async Task<Singer> AddAsync(SingerDTO singer)
        {
            var singerMap = _mapper.Map<Singer>(singer);
           return await _singerRepository.AddAsync(singerMap);

           
        }
        public async Task<Singer> UpdateAsync(int id,SingerDTO singer)
        {
            var singerMap = _mapper.Map<Singer>(singer);

           return await _singerRepository.UpdateAsync(id,singerMap);
        }
        public async Task DeleteAsync(int id) => await _singerRepository.DeleteAsync(id);

    }
}
