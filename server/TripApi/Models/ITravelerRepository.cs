using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripApi.Models
{
    public interface ITravelerRepository
    {
        Traveler GetById(int id);
        Traveler GetBy(string email);
        void Add(Traveler customer);
        void SaveChanges();
    }
}
