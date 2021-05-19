using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripApi.Models
{
    public class Traveler
    {
        #region Properties
        //add extra properties if needed
        public int TravelerId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public ICollection<OrganizerTrip> OrganizerTrips { get; private set; }

        public IEnumerable<Trip> MyTrips => OrganizerTrips.Select(f => f.Trip);

        public ICollection<TripParticipant> Favorites { get; private set; }

        public IEnumerable<Trip> FavoriteTrips => Favorites.Select(f => f.Trip);
        #endregion

        #region Constructors
        public Traveler()
        {
            Favorites = new List<TripParticipant>();
            OrganizerTrips = new List<OrganizerTrip>();
        }
        #endregion

        #region Methods
        // If the user is the organizer the trip is added to this user with this method
        public void AddMyTrip(Trip trip)
        {
            OrganizerTrips.Add(new OrganizerTrip() { TripId = trip.Id, TravelerId = TravelerId, Trip = trip, Traveler = this });
        }
        // participants are added to the trip
        // favorite trips are not yet added to the traveler
        public void AddFavoriteTrip(Trip trip, int goingStatus)
        {
            Favorites.Add(new TripParticipant() { TripId = trip.Id, TravelerId = TravelerId, Trip = trip, Traveler = this, GoingStatus = goingStatus });
        }
        //public void AddFavoriteTrip(Trip trip)
        //{
        //    Favorites.Add(new TripParticipant() { TripId = trip.Id, TravelerId = TravelerId, Trip = trip, Traveler = this });
        //}
        #endregion
    }
}