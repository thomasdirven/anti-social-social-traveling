using Microsoft.EntityFrameworkCore;
using TripApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace TripApi.Data.Repositories
{
    public class TripRepository : ITripRepository
    {
        private readonly TripContext _context;
        private readonly DbSet<Trip> _trips;

        public TripRepository(TripContext dbContext)
        {
            _context = dbContext;
            _trips = dbContext.Trips;
        }

        public IEnumerable<Trip> GetAll()
        {
            return _trips.Include(r => r.Attractions).ToList();
        }

        public Trip GetBy(int id)
        {
            return _trips.Include(r => r.Attractions).SingleOrDefault(r => r.Id == id);
        }

        public bool TryGetTrip(int id, out Trip trip)
        {
            trip = _context.Trips.Include(t => t.Attractions).FirstOrDefault(t => t.Id == id);
            return trip != null;
        }

        public void Add(Trip trip)
        {
            _trips.Add(trip);
        }

        public void Update(Trip trip)
        {
            _context.Update(trip);
        }

        public void Delete(Trip trip)
        {
            _trips.Remove(trip);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public IEnumerable<Trip> GetBy(string city = null, string country = null, string attractionName = null)
        {
            var trips = _trips.Include(r => r.Attractions).AsQueryable();
            if (!string.IsNullOrEmpty(city))
                trips = trips.Where(r => r.City.IndexOf(city) >= 0);
            if (!string.IsNullOrEmpty(country))
                trips = trips.Where(r => r.Country == country);
            if (!string.IsNullOrEmpty(attractionName))
                trips = trips.Where(r => r.Attractions.Any(i => i.Name == attractionName));
            return trips.OrderBy(r => r.City).ToList();
        }
    }
}

