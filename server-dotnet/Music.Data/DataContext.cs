using Music.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Music.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
       

        public DbSet<User> Users { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<Singer> Singers { get; set; }
        public DbSet<Playlist> Playlists { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Singer>()
                .Property(s => s.Name)
                .HasColumnType("varchar(255)")  // מגדיר במפורש סוג עמודה ל-MySQL
                .HasMaxLength(255)
                .IsRequired();
        }


        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=music_db");

        //}
    }

}
