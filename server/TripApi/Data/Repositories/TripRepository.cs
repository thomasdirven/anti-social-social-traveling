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
            return _trips.Include(t => t.Attractions).Include(t => t.Participants).ToList();
        }
       
        public Trip GetBy(int id)
        {
            return _trips.Include(t => t.Attractions).Include(t => t.Participants).SingleOrDefault(t => t.Id == id);
        }

        public bool TryGetTrip(int id, out Trip trip)
        {
            trip = _context.Trips.Include(t => t.Attractions).Include(t => t.Participants).FirstOrDefault(t => t.Id == id);
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
            var trips = _trips.Include(t => t.Attractions).Include(t => t.Participants).AsQueryable();
            if (!string.IsNullOrEmpty(city))
                //trips = trips.Where(t => t.City.Contains(city, System.StringComparison.OrdinalIgnoreCase));
                // should be the same result but the above method gives errors
                trips = trips.Where(t => t.City.IndexOf(city) >= 0);
            if (!string.IsNullOrEmpty(country))
                trips = trips.Where(t => t.Country.IndexOf(country) >= 0);
            if (!string.IsNullOrEmpty(attractionName))
                trips = trips.Where(t => t.Attractions.Any(i => i.Name.IndexOf(attractionName) >= 0));
            return trips.OrderBy(t => t.StartDate).ToList();
        }
    }
}

