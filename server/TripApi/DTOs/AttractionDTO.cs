using System.ComponentModel.DataAnnotations;

namespace TripApi.DTOs
{
    public class AttractionDTO
    {
        [Required]
        public string Name { get; set; }

        // Optional
        public string Type { get; set; }

        // Optional
        public double? Budget { get; set; }
    }
}
