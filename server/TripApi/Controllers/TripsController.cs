using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TripApi.DTOs;
using TripApi.Models;

namespace TripApi.Controllers
{
    [ApiConventionType(typeof(DefaultApiConventions))]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly ITripRepository _tripRepository;

        public TripsController(ITripRepository context)
        {
            _tripRepository = context;
        }

        // GET: api/trips
        /// <summary>
        /// Get all Trips ordered by startDate
        /// </summary>
        /// <returns>Array of Trips</returns>
        [HttpGet]
        public ActionResult<IEnumerable<Trip>> GetTrips()
        {
            try
            {
                return _tripRepository.GetAll().OrderBy(r => r.StartDate).ToList();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // GET: api/trips/id
        /// <summary>
        /// Get Trip with given id
        /// </summary>
        /// <param name="id">The id of the Trip</param>
        /// <returns>The Trip</returns>
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

        // POST: api/trips
        /// <summary>
        /// Adds a new Trip
        /// </summary>
        /// <param name="trip">The new Trip</param>
        [HttpPost]
        public ActionResult<Trip> PostTrip(TripDTO trip)
        {
            try
            {
                Trip tripToCreate = new Trip() { City = trip.City, Country = trip.Country, StartDate = trip.StartDate, EndDate = trip.EndDate, MinDays = trip.MinDays, MaxDays = trip.MaxDays };
                foreach (var a in trip.Attractions)
                    tripToCreate.AddAttraction(new Attraction(a.Name, a.Type, a.Budget));
                _tripRepository.Add(tripToCreate);
                _tripRepository.SaveChanges();

                // 201 - link to get new Trip
                return CreatedAtAction(nameof(GetTrip), new { id = tripToCreate.Id }, tripToCreate);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // PUT: api/trips/id
        /// <summary>
        /// Modifies a Trip
        /// </summary>
        /// <param name="id">The id of the Trip</param>
        /// <param name="trip">The modified Trip</param>
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

        // DELETE: api/trips/id
        /// <summary>
        /// Deletes a Trip
        /// </summary>
        /// <param name="id">The id of the Trip to be deleted</param>
        /// <returns></returns>
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

        // GET: api/trips/id/attractions
        /// <summary>
        /// Get all Attractions for a Trip
        /// </summary>
        /// <param name="id">id of the Trip</param>
        /// <returns>all Attractions of the Trip</returns>
        [HttpGet("{id}/attractions")]
        public ActionResult<IEnumerable<Attraction>> GetAttractions(int id)
        //public ICollection<Attraction> GetAttractions(int id)
        {
            try
            {
                if (!_tripRepository.TryGetTrip(id, out var trip)) return NotFound();
                return trip.Attractions.ToList();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // GET: api/trips/id/attractions/attractionId
        /// <summary>
        /// Get an Attraction for a Trip
        /// </summary>
        /// <param name="id">id of the Trip</param>
        /// <param name="attractionId">id of the Attraction</param>
        /// <returns>An Attraction of the Trip</returns>
        [HttpGet("{id}/attractions/{attractionId}")]
        public ActionResult<Attraction> GetAttraction(int id, int attractionId)
        {
            try
            {
                if (!_tripRepository.TryGetTrip(id, out var trip)) return NotFound();
                Attraction attraction = trip.GetAttraction(attractionId);
                if (attraction == null) return NotFound();
                return attraction;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // POST: api/trip/id/attractions
        /// <summary>
        /// Adds an attraction to a trip
        /// </summary>
        /// <param name="id">id of the Trip</param>
        /// <param name="attraction">the Attraction to be added</param>
        [HttpPost("{id}/attractions")]
        public ActionResult<Attraction> PostAttraction(int id, AttractionDTO attraction)
        {
            try
            {
                if (!_tripRepository.TryGetTrip(id, out var trip)) return NotFound();
                var attractionToCreate = new Attraction(attraction.Name, attraction.Type, attraction.Budget);
                trip.AddAttraction(attractionToCreate);
                _tripRepository.SaveChanges();
                return CreatedAtAction("GetAttraction", new { id = trip.Id, attractionId = attractionToCreate.Id }, attractionToCreate);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // DELETE: api/trip/id/attractions/attractionId
        /// <summary>
        /// Deletes an Attraction of a Trip
        /// </summary>
        /// <param name="id">id of the Trip</param>
        /// <param name="attractionId">id of the Attraction</param>
        [HttpDelete("{id}/attractions/{attractionId}")]
        public IActionResult DeleteAttraction(int id, int attractionId)
        {
            try
            {
                if (!_tripRepository.TryGetTrip(id, out var trip)) return NotFound();
                trip.DeleteAttraction(trip.GetAttraction(attractionId));
                _tripRepository.Update(trip);
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
