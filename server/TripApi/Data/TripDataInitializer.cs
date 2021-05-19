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
                Traveler admin = new Traveler { Email = "tripmaster@hogent.be", FirstName = "Thomas", LastName = "Dirven" };
                _dbContext.Travelers.Add(admin);
                admin.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 1));
                admin.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 2));
                admin.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 3));
                admin.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 5));
                admin.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 6));
                admin.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 7));
                //admin.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 8));
                admin.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 9));
                await CreateUser(admin.Email, "P@ssword1111");
                Traveler standardUser = new Traveler { Email = "student@hogent.be", FirstName = "Gaston", LastName = "D'Haese" };
                _dbContext.Travelers.Add(standardUser);
                standardUser.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 4));
                standardUser.AddMyTrip(_dbContext.Trips.SingleOrDefault(t => t.Id == 10));
                await CreateUser(standardUser.Email, "P@ssword1111");
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