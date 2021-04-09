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

        public ICollection<Attraction> Attractions { get; private set; }
        #endregion

        #region Constructors
        public Trip()
        {
            Attractions = new List<Attraction>();
            //Created = DateTime.Now;
        }

        public Trip(string city) : this()
        {
            City = city;
        }
        #endregion

        #region Methods
        public void AddAttraction(Attraction attration) => Attractions.Add(attration);

        public Attraction GetAttraction(int id) => Attractions.SingleOrDefault(i => i.Id == id);
        #endregion
    }
}