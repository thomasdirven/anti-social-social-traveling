using System.ComponentModel.DataAnnotations;

namespace TripApi.DTOs
{
    public class AttractionDTO
    {
        [Required]
        public string Name { get; set; }

        public string Type { get; set; }

        public double? Budget { get; set; }
    }
}
