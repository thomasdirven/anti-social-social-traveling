using System.Text.Json.Serialization;

namespace TripApi.Models
{
    public class OrganizerTrip
    {
        public int TravelerId { get; set; }

        public int TripId { get; set; }

        public Traveler Traveler { get; set; }

        // Avoid self referencing loop
        [JsonIgnore]
        public Trip Trip { get; set; }

        //public OrganizerTrip(int travelerId, int tripId, Traveler traveler, Trip trip, int goingStatus)
        //{
        //    TravelerId = travelerId;
        //    TripId = tripId;
        //    Traveler = traveler;
        //    Trip = trip;
        //}

        //public OrganizerTrip()
        //{
        //}
    }
}
