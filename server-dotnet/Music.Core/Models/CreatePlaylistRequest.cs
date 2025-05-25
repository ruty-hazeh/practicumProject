using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.Core.Models
{
    public class CreatePlaylistRequest
    {
        public string Name { get; set; }
    }

    public class SmartPlaylistRequest
    {
        public string MoodText { get; set; }
    }


    public class AddSongRequest
    {
        public int SongId { get; set; }
    }
}
