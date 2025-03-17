using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.Core.Dtos
{
    public class SongDTO
    {
        public string Name { get; set; }
        public string Genre { get; set; }
        public TimeSpan Duration { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string SongUrl { get; set; }


        public int SingerId { get; set; }
    }
}
