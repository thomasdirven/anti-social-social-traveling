using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TripApi.Models;

namespace TripApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        private readonly ITripRepository _tripRepository;

        public TripController(ITripRepository context)
        {
            _tripRepository = context;
        }

        // GET: api/Trips
        [HttpGet]
        public IEnumerable<Trip> GetTrips()
        {
            return _tripRepository.GetAll().OrderBy(r => r.City);
        }
    }
}
