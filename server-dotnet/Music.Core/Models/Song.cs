using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.Core.Models
{
    public class Song
    {
        //public int SongId { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Genre { get; set; }
        public TimeSpan Duration { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string SongUrl { get; set; }
       

        public int SingerId { get; set; }
        public Singer Singer { get; set; }
        public List<User> Users { get; set; }
    }
}
