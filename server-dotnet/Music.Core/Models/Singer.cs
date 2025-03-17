using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.Core.Models
{
    public class Singer
    {
       
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Song> Songs { get; set; }
    }
}
