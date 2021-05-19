using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TripApi.Models
{
    public class Trip
    {
        #region Properties
        public int Id { get; set; }

        [Required]
        public string City { get; set; }

        public string Country { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int MinDays { get; set; }
        public int MaxDays { get; set; }

        public double Latitude { get; set; }
        public double Longtitude { get; set; }

        public ICollection<Attraction> Attractions { get; private set; }

        // Todo -> change to Traverler or TravelerId
        public string OrganizerName { get; set; }

        public int TravelerId { get; set; }

        // TODO change to map <User, enum>
        //public int? Participants { get; set; }
        public ICollection<TripParticipant> Participants { get; private set; }

        public int? TotalBudget { get; set; }

        #endregion

        #region Constructors
        public Trip()
        {
            Attractions = new List<Attraction>();
            Participants = new List<TripParticipant>();
            //Created = DateTime.Now;
        }

        public Trip(string city) : this()
        {
            City = city;
        }
        #endregion

        #region Methods
        public void AddAttraction(Attraction attration) => Attractions.Add(attration);
        public void DeleteAttraction(Attraction attraction) => Attractions.Remove(attraction);

        public Attraction GetAttraction(int id) => Attractions.SingleOrDefault(i => i.Id == id);

        public void AddParticipant(TripParticipant participant) => Participants.Add(participant);
        public void DeleteParticipant(TripParticipant participant) => Participants.Remove(participant);
        #endregion
    }
}