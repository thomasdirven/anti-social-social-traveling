using Microsoft.EntityFrameworkCore;
using System;
using TripApi.Models;

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
                 new Trip { Id = 1, City = "Barcelona", Country = "Spain", StartDate = DateTime.Now, EndDate = DateTime.Now, MinDays = 2, MaxDays = 5 },
                 new Trip { Id = 2, City = "Paris", Country = "France", StartDate = DateTime.Now, EndDate = DateTime.Now, MinDays = 3, MaxDays = 8 },
                 new Trip { Id = 3, City = "Prague", Country = "Czech Republic", StartDate = DateTime.Now, EndDate = DateTime.Now, MinDays = 4, MaxDays = 7 }
            );

            builder.Entity<Attraction>().HasData(
                    //Shadow property can be used for the foreign key, in combination with anaonymous objects
                    // Barcelona - Spain
                    new { Id = 1, Name = "La Sagrada Familia", Budget = (double?)35, Type = "Historic Building", TripId = 1 },
                    new { Id = 2, Name = "Park Güell", Budget = (double?)25, Type = "Park", TripId = 1 },
                    new { Id = 3, Name = "Casa Milà", Budget = (double?)50, Type = "Museum", TripId = 1 },
                    new { Id = 4, Name = "Plaça de Catalunya", Budget = (double?)0, Type = "Square", TripId = 1 },
                    // Paris - France
                    new { Id = 5, Name = "Eiffel Tower", Budget = (double?)25, Type = "Historic Building", TripId = 2 },
                    new { Id = 6, Name = "Louvre Museum", Budget = (double?)50, Type = "Museum", TripId = 2 },
                    new { Id = 7, Name = "Cathédrale Notre-Dame de Paris", Budget = (double?)50, Type = "Historic Building", TripId = 2 },
                    // Prague - Czech Republic
                    new { Id = 8, Name = "St. Vitus Cathedral", Budget = (double?)20, Type = "Historic Building", TripId = 3 },
                    new { Id = 9, Name = "Charles Bridge", Budget = (double?)0, Type = "Historic Building", TripId = 3 },
                    new { Id = 10, Name = "Prague Astronomical Clock", Budget = (double?)0, Type = "Historic Building", TripId = 3 }
                 );
        }

        public DbSet<Trip> Trips { get; set; }
    }
}
