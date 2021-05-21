using TripApi.Models;

namespace TripApi.DTOs
{
    public class TripParticipantDTO // No validation needed for current ussage
    {
        // Even if someone tries to send someone else their travelerId with a random going status for a trip
        // This won't do anything on the serverside
        // In the TripsController => PUT method => we see that only the travelerId and Name can be used of the logged in user

        public int TravelerId { get; set; }

        public int TripId { get; set; }

        //public Traveler Traveler { get; set; }

        //public Trip Trip { get; set; }

        public int GoingStatus { get; set; }

        public string TravelerName { get; set; }
    }
}
