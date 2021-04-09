using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripApi.Models
{
    public class Attraction
    {
        #region Properties
        public int Id { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public double? Budget { get; set; }
        #endregion

        #region Constructors
        public Attraction(string name, string type = null, double? budget = null)
        {
            Name = name;
            Type = type;
            Budget = budget;
        }
        #endregion
    }
}