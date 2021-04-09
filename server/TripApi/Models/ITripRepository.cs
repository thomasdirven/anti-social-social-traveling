using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripApi.Models;

namespace TripApi.Models
{
    public interface ITripRepository
    {
        Trip GetBy(int id);
        bool TryGetTrip(int id, out Trip trip);
        IEnumerable<Trip> GetAll();
        IEnumerable<Trip> GetBy(string name = null, string chef = null, string ingredientName = null);
        void Add(Trip trip);
        void Delete(Trip trip);
        void Update(Trip trip);
        void SaveChanges();
    }
}
