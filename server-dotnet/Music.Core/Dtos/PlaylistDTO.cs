using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.Core.Dtos
{
    public class PlaylistDTO
    {
        public string Name { get; set; }
        public List<int> SongIds { get; set; } = new List<int>();
        public int UserId { get; set; } = 0;
    }
}
