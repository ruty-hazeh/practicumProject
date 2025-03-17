using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Music.Core.Repositories;
using Music.Data.Repositories;
using Music.Core.Models;
using Music.Core.Services;
using Music.Core.Dtos;
using AutoMapper;

namespace Music.Service
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;


        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<User>> GetAllAsync() => await _userRepository.GetAllAsync();
        public async Task<User> GetByIdAsync(int id) => await _userRepository.GetByIdAsync(id);
        public async Task<User> AddAsync(UserDTO user)
        {
            var userMap = _mapper.Map<User>(user);
           return await _userRepository.AddAsync(userMap);
        }
        public async Task<User> UpdateAsync(int id,UserDTO user)
        {
            var userMap = _mapper.Map<User>(user);
            return await _userRepository.UpdateAsync(id,userMap);
        }
        public async Task DeleteAsync(int id) => await _userRepository.DeleteAsync(id);
    }

}

