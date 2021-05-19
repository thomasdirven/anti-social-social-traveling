using TripApi.Models;

namespace TripApi.DTOs
{
    public class TripParticipantDTO
    {
        public int TravelerId { get; set; }

        public int TripId { get; set; }

        //public Traveler Traveler { get; set; }

        //public Trip Trip { get; set; }

        public int GoingStatus { get; set; }

        public string TravelerName { get; set; }
    }
}
