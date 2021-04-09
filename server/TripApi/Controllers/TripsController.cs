using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TripApi.Models;

namespace TripApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly ITripRepository _tripRepository;

        public TripsController(ITripRepository context)
        {
            _tripRepository = context;
        }

        // GET: api/Trips
        [HttpGet]
        public IEnumerable<Trip> GetTrips()
        {
            return _tripRepository.GetAll().OrderBy(r => r.City);
        }

        // GET: api/Trips/id
        [HttpGet("{id}")]
        public ActionResult<Trip> GetTrip(int id)
        {
            Trip trip = _tripRepository.GetBy(id);
            if (trip == null) return NotFound();
            return trip;
        }
    }
}
