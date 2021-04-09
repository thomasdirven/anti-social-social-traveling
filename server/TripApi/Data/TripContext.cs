using Microsoft.EntityFrameworkCore;
using TripApi.Models;
using System;

namespace TripApi.Data
{
    public class TripContext : DbContext
    {
        public TripContext(DbContextOptions<TripContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Trip>()
                .HasMany(p => p.Attractions)
                .WithOne()
                .IsRequired()
                .HasForeignKey("TripId"); //Shadow property
            builder.Entity<Trip>().Property(r => r.City).IsRequired();
            // builder.Entity<Trip>().Property(r => r.Country).HasMaxLength(50);
            builder.Entity<Attraction>().Property(r => r.Name).IsRequired();
            // builder.Entity<Attraction>().Property(r => r.Type).HasMaxLength(50);

            //Another way to seed the database
            builder.Entity<Trip>().HasData(
                 new Trip { Id = 1, City = "Barcelona", StartDate = DateTime.Now, EndDate = DateTime.Now, MinDays = 2, MaxDays = 5 },
                 new Trip { Id = 2, City = "Paris", StartDate = DateTime.Now, EndDate = DateTime.Now, MinDays = 3, MaxDays = 8 }
  );

            builder.Entity<Attraction>().HasData(
                    //Shadow property can be used for the foreign key, in combination with anaonymous objects
                    new { Id = 1, Name = "La Sagrada Familia", Budget = (double?)35, Type = "Historic Building", TripId = 1 },
                    new { Id = 2, Name = "Park Güell", Budget = (double?)25, Type = "Park", TripId = 1 },
                    new { Id = 3, Name = "Casa Milà", Budget = (double?)50, Type = "Museum", TripId = 1 },
                    new { Id = 4, Name = "Plaça de Catalunya", Budget = (double?)0, Type = "Square", TripId = 1 }
                 );
        }

        public DbSet<Trip> Trips { get; set; }
    }
}
