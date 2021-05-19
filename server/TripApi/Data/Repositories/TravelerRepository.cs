using Microsoft.EntityFrameworkCore;
using System.Linq;
using TripApi.Models;

namespace TripApi.Data.Repositories
{
    public class TravelerRepository : ITravelerRepository
    {
        private readonly TripContext _context;
        private readonly DbSet<Traveler> _travelers;

        public TravelerRepository(TripContext dbContext)
        {
            _context = dbContext;
            _travelers = dbContext.Travelers;
        }

        public Traveler GetById(int id)
        {
            return _travelers.SingleOrDefault(c => c.TravelerId == id);
        }

        public Traveler GetBy(string email)
        {
            return _travelers.Include(c => c.OrganizerTrips).ThenInclude(f => f.Trip).ThenInclude(r => r.Attractions).SingleOrDefault(c => c.Email == email);
        }

        public void Add(Traveler traveler)
        {
            _travelers.Add(traveler);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}