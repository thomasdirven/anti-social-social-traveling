
using TripApi.Models;
using System.Collections.Generic;

namespace TripApi.DTOs
{
    public class TravelerDTO // No validation needed for current ussage
    {
        public int TravelerId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        //public IEnumerable<Trip> Trips { get; set; }

        public TravelerDTO() { }

        public TravelerDTO(Traveler traveler) : this()
        {
            TravelerId = traveler.TravelerId;
            FirstName = traveler.FirstName;
            LastName = traveler.LastName;
            Email = traveler.Email;
            //Trips = traveler.MyTrips;
        }
    }
}
