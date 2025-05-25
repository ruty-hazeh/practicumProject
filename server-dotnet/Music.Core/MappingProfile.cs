using AutoMapper;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Music.Core.Models;
using Music.Core.Dtos;
namespace Music.Service
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Singer,SingerDTO >().ReverseMap();
            CreateMap<Song,SongDTO >().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Playlist, PlaylistDTO>().ReverseMap();

        }
    }
}

