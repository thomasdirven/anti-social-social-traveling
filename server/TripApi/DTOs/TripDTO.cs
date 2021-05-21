using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TripApi.DTOs
{
    public class TripDTO
    {
        [Required]
        [MinLength(3)]
        public string City { get; set; }

        [Required]
        [MinLength(2)]
        public string Country { get; set; }

        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public int MinDays { get; set; }
        [Required]
        public int MaxDays { get; set; }

        [Required]
        public double Latitude { get; set; }
        [Required]
        public double Longtitude { get; set; }

        // Optional
        public IList<AttractionDTO> Attractions { get; set; }

        // It's overwritten on the serverside so input of client side is ignored
        public string Organizer { get; set; }

        // TODO change to map <User, enum>
        //public int? Participants { get; set; }
        // Optional
        public IList<TripParticipantDTO> Participants { get; set; }

        // Optional
        public int? TotalBudget { get; set; }
    }
}
