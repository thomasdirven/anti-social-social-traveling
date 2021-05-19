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
                Traveler customer = new Traveler { Email = "tripmaster@hogent.be", FirstName = "Thomas", LastName = "Dirven" };
                _dbContext.Travelers.Add(customer);
                await CreateUser(customer.Email, "P@ssword1111");
                Traveler student = new Traveler { Email = "student@hogent.be", FirstName = "Student", LastName = "Hogent" };
                _dbContext.Travelers.Add(student);
                //student.AddFavoriteTrip(_dbContext.Trips.First(), 1);
                await CreateUser(student.Email, "P@ssword1111");
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