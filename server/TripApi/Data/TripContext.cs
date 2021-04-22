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
                 new Trip { Id = 1, City = "Barcelona", Country = "Spain", StartDate = new DateTime(2021, 7, 14), EndDate = new DateTime(2021, 7, 25), MinDays = 2, MaxDays = 5, Budget = 550, Latitude = 41.3850639, Longtitude = 2.1734035 },
                 new Trip { Id = 2, City = "Paris", Country = "France", StartDate = new DateTime(2021, 7, 20), EndDate = new DateTime(2021, 8, 2), MinDays = 3, MaxDays = 8, Budget = 550, Latitude = 48.856614, Longtitude = 2.3522219 },
                 new Trip { Id = 3, City = "Prague", Country = "Czech Republic", StartDate = new DateTime(2021, 7, 10), EndDate = new DateTime(2021, 8, 10), MinDays = 4, MaxDays = 7, Budget = 550, Latitude = 50.0755381, Longtitude = 14.4378005 },
                 new Trip { Id = 4, City = "Cannes", Country = "France", StartDate = new DateTime(2021, 7, 6), EndDate = new DateTime(2021, 7, 17), MinDays = 3, MaxDays = 6, Budget = 550, Latitude = 43.552847, Longtitude = 7.017369 },
                 new Trip { Id = 5, City = "Dubrovnik", Country = "Croatia", StartDate = new DateTime(2021, 8, 25), EndDate = new DateTime(2021, 9, 16), MinDays = 4, MaxDays = 6, Budget = 550, Latitude = 42.65066059, Longtitude = 18.0944238 },
                 new Trip { Id = 6, City = "Lisbon", Country = "Portugal", StartDate = new DateTime(2021, 5, 4), EndDate = new DateTime(2021, 5, 9), MinDays = 2, MaxDays = 5, Budget = 550, Latitude = 38.7222524, Longtitude = -9.1393366 },
                 new Trip { Id = 7, City = "Milan", Country = "Italy", StartDate = new DateTime(2021, 6, 20), EndDate = new DateTime(2021, 7, 2), MinDays = 3, MaxDays = 8, Budget = 550, Latitude = 45.4642035, Longtitude = 9.189982 },
                 new Trip { Id = 8, City = "Copenhagen", Country = "Denmark", StartDate = new DateTime(2021, 9, 19), EndDate = new DateTime(2021, 10, 1), MinDays = 4, MaxDays = 7, Budget = 550, Latitude = 55.6760968, Longtitude = 12.5683372 },
                 new Trip { Id = 9, City = "Dublin", Country = "Ireland", StartDate = new DateTime(2021, 10, 5), EndDate = new DateTime(2021, 10, 17), MinDays = 3, MaxDays = 6, Budget = 550, Latitude = 53.3498053, Longtitude = -6.2603097 },
                 new Trip { Id = 10, City = "Athens", Country = "Greece", StartDate = new DateTime(2021, 11, 7), EndDate = new DateTime(2021, 11, 16), MinDays = 4, MaxDays = 6, Budget=550, Latitude = 37.9838096, Longtitude = 23.7275388 }
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
                    new { Id = 10, Name = "Prague Astronomical Clock", Budget = (double?)0, Type = "Historic Building", TripId = 3 },
                    // Cannes - France
                    new { Id = 11, Name = "Cannes Film Festival", Budget = (double?)150, Type = "Event", TripId = 4 },
                    new { Id = 12, Name = "Île Sainte-Marguerite", Budget = (double?)0, Type = "Other", TripId = 4 }
                 );
        }

        public DbSet<Trip> Trips { get; set; }
    }
}
