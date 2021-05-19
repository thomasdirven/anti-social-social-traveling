using System.Text.Json.Serialization;

namespace TripApi.Models
{
    public class TripParticipant
    {
        public int TravelerId { get; set; }

        public int TripId { get; set; }

        public Traveler Traveler { get; set; }

        // Avoid self referencing loop
        [JsonIgnore]
        public Trip Trip { get; set; }

        public int GoingStatus { get; set; }

        public string TravelerName { get; set; }

        public TripParticipant(int travelerId, int tripId, Traveler traveler, Trip trip, int goingStatus, string travelerName)
        {
            TravelerId = travelerId;
            TripId = tripId;
            Traveler = traveler;
            Trip = trip;
            GoingStatus = goingStatus;
            TravelerName = travelerName;
        }

        public TripParticipant()
        {
        }
    }
}
