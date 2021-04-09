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

        // POST: api/Trips
        [HttpPost]
        public ActionResult<Trip> PostTrip(Trip trip)
        {
            _tripRepository.Add(trip);
            _tripRepository.SaveChanges();

            return CreatedAtAction(nameof(GetTrip), new { id = trip.Id }, trip);
        }

        // PUT: api/Trips/id
        [HttpPut("{id}")]
        public IActionResult PutTrip(int id, Trip trip)
        {
            // 404 if trip with id doesn't exist
            if (_tripRepository.GetBy(id) == null) return NotFound();
            // 204 (No Content) or 400 (Bad Request) when ModelState validation fails or id’s don’t match
            if (id != trip.Id) return BadRequest();
            
            _tripRepository.Update(trip);
            _tripRepository.SaveChanges();
            return NoContent();
        }

    }
}
