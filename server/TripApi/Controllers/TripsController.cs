using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
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
            try
            {
                Trip trip = _tripRepository.GetBy(id);
                if (trip == null) return NotFound();
                return trip;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // POST: api/Trips
        [HttpPost]
        public ActionResult<Trip> PostTrip(Trip trip)
        {
            try
            {
                _tripRepository.Add(trip);
                _tripRepository.SaveChanges();

                // 201 - link to get new Trip
                return CreatedAtAction(nameof(GetTrip), new { id = trip.Id }, trip);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // PUT: api/Trips/id
        [HttpPut("{id}")]
        public IActionResult PutTrip(int id, Trip trip)
        {
            try
            {
                // 404 if trip with id doesn't exist
                if (_tripRepository.GetBy(id) == null) return NotFound();
                // 400 (Bad Request) id’s don’t match
                if (id != trip.Id) return BadRequest();

                _tripRepository.Update(trip);
                _tripRepository.SaveChanges();
                // 204(No Content) when ModelState validation fails or 200+Trip
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // DELETE: api/Trips/id
        [HttpDelete("{id}")]
        public IActionResult DeleteTrip(int id)
        {
            try
            {
                Trip trip = _tripRepository.GetBy(id);
                if (trip == null) return NotFound();
                _tripRepository.Delete(trip);
                _tripRepository.SaveChanges();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
