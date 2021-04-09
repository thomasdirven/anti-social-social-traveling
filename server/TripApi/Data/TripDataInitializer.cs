namespace TripApi.Data
{
    public class TripDataInitializer
    {
        private readonly TripContext _dbContext;

        public TripDataInitializer(TripContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void InitializeData()
        {
            _dbContext.Database.EnsureDeleted();
            if (_dbContext.Database.EnsureCreated())
            {
                //seeding the database with recipes, see DBContext               
            }
        }

    }
}