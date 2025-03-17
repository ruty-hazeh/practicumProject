using Music.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Music.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> users { get; set; }
        public DbSet<Song> songs { get; set; }
        public DbSet<Singer> singers { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=music_db");

        }
    }

}
