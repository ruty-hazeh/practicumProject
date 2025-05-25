using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.Core.Dtos
{
    public class SongAIResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SongUrl { get; set; }
        public string Genre { get; set; }
        public string SingerName { get; set; }
    }
}
