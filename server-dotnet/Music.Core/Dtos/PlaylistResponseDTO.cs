using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.Core.Dtos
{
    public class PlaylistResponseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<string> SongTitles { get; set; }
    }
}
