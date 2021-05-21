using Microsoft.AspNetCore.Identity;
using TripApi.Models;
using System.Linq;
using System.Threading.Tasks;

namespace TripApi.Data
{
    public class TripDataInitializer
    {
        private readonly TripContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public TripDataInitializer(TripContext dbContext, UserManager<IdentityUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task InitializeData()
        {
            _dbContext.Database.EnsureDeleted();
            if (_dbContext.Database.EnsureCreated())
            {
                //seeding the database with recipes, see DBContext
                Traveler thomas = new Traveler { Email = "thomas@hogent.be", FirstName = "Thomas", LastName = "Dirven" };
                _dbContext.Travelers.Add(thomas);
                thomas.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 1));
                thomas.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 2));
                thomas.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 3));
                //admin.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 5));
                //admin.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 6));
                thomas.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 7));
                //admin.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 8));
                thomas.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 9));
                await CreateUser(thomas.Email, "P@ssword1111");
                Traveler gaston = new Traveler { Email = "gaston@hogent.be", FirstName = "Gaston", LastName = "D'Haese" }; // Gaston D'Haese
                _dbContext.Travelers.Add(gaston);
                gaston.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 4));
                gaston.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 10));
                await CreateUser(gaston.Email, "P@ssword1111");
                Traveler eddy = new Traveler { Email = "eddy@hogent.be", FirstName = "Eddy", LastName = "Walput" }; // Eddy Walput
                _dbContext.Travelers.Add(eddy);
                eddy.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 5));
                eddy.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 6));
                await CreateUser(eddy.Email, "P@ssword1111");
                _dbContext.SaveChanges();
            }
        }

        private async Task CreateUser(string email, string password)
        {
            var user = new IdentityUser { UserName = email, Email = email };
            await _userManager.CreateAsync(user, password);
        }

    }
}