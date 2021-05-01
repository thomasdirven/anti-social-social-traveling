using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TripApi.DTOs
{
    public class TripDTO
    {
        [Required]
        public string City { get; set; }

        public string Country { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int MinDays { get; set; }
        public int MaxDays { get; set; }

        public double Latitude { get; set; }
        public double Longtitude { get; set; }

        public IList<AttractionDTO> Attractions { get; set; }

        public string Organizer { get; set; }

        // TODO change to map <User, enum>
        //public int? Participants { get; set; }
        public IList<ParticipantDTO> Participants { get; set; }

        public int? TotalBudget { get; set; }
    }
}
