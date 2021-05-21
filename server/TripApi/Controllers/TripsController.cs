using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly ITripRepository _tripRepository;
        private readonly ITravelerRepository _travelerRepository;

        public TripsController(ITripRepository tripRepository, ITravelerRepository travelerRepository)
        {
            _tripRepository = tripRepository;
            _travelerRepository = travelerRepository;
        }

        // GET: api/trips
        /// <summary>
        /// Get all Trips ordered by startDate
        /// (Ability to filter search results with parameters)
        /// </summary>
        /// <param name="city"></param>
        /// <param name="country"></param>
        /// <param name="attractionName"></param>
        /// <returns>Array of Trips</returns>
        [HttpGet]
        //[AllowAnonymous]
        public ActionResult<IEnumerable<Trip>> GetTrips(string city = null, string country = null, string attractionName = null)
        {
            try
            {
                // to test server error
                //return StatusCode(StatusCodes.Status500InternalServerError, "test error");
                if (string.IsNullOrEmpty(city) && string.IsNullOrEmpty(country) && string.IsNullOrEmpty(attractionName))
                    return _tripRepository.GetAll().OrderBy(t => t.StartDate).ToList();
                return _tripRepository.GetBy(city, country, attractionName).ToList();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // GET: api/mytrips
        /// <summary>
        /// Get Trips that the logged in user organized ordered by startDate
        /// </summary>
        /// <returns>Array of Trips</returns>
        [HttpGet("MyTrips")]
        public ActionResult<IEnumerable<Trip>> GetMyTrips()
        {
            try
            {
                Traveler traveler = _travelerRepository.GetBy(User.Identity.Name);
                //Console.WriteLine(traveler.LastName);
                //Console.WriteLine(traveler.MyTrips.Count());
                return traveler.MyTrips.OrderBy(t => t.StartDate).ToList();
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
                Traveler traveler = _travelerRepository.GetBy(User.Identity.Name);
                Console.WriteLine(trip.Latitude);
                Console.WriteLine(trip.Longtitude);
                Trip tripToCreate = new Trip()
                {
                    City = trip.City,
                    Country = trip.Country,
                    StartDate = trip.StartDate,
                    EndDate = trip.EndDate,
                    MinDays = trip.MinDays,
                    MaxDays = trip.MaxDays,
                    Latitude = trip.Latitude,
                    Longtitude = trip.Longtitude,
                    TotalBudget = trip.TotalBudget,
                    OrganizerName = (traveler.FirstName + ' ' + traveler.LastName),
                    TravelerId = traveler.TravelerId,
                };
                foreach (var a in trip.Attractions)
                    tripToCreate.AddAttraction(new Attraction(a.Name, a.Type, a.Budget));

                traveler.AddMyTrip(tripToCreate);
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
        /// Modifies a Trip - 
        /// Only used to add/remove logged in user as participant to a trip
        /// </summary>
        /// <param name="id">The id of the Trip</param>
        /// <param name="trip">The modified Trip</param>
        [HttpPut("{id}")]
        public IActionResult PutTrip(int id, TripDTO trip)
        {
            try
            {
                // I wanted to demonstrate I can use a PUT method
                // I know I'm sending the entire trip with all the participants
                // but only the goingStatus of the logged in user can be changed
                // so it's secure, you cannot change the goingstatus of another user

                // Todo, make cleaner, but no time so props no
                Traveler traveler = _travelerRepository.GetBy(User.Identity.Name);

                int selectedTravelerId = traveler.TravelerId;

                //Console.WriteLine("travelerid: " + selectedTravelerId);

                Trip tripToUpdate = _tripRepository.GetBy(id);
                // 404 if trip with id doesn't exist
                if (tripToUpdate == null) return NotFound();
                // 400 (Bad Request) id’s don’t match
                if (id != tripToUpdate.Id) return BadRequest();
                // remove goingStatus that was already in participants for this user
                foreach (var p in tripToUpdate.Participants.ToList())
                {
                    if (p.TravelerId == selectedTravelerId)
                    {
                        tripToUpdate.DeleteParticipant(p);
                    }
                }

                // Error: "Collection was modified; enumeration operation may not execute."
                // So I tried to solve it by using a .ToList()

                // add new goingStatus that was already in participants for this user
                foreach (var p in trip.Participants.ToList())
                {
                    if (p.TravelerId == selectedTravelerId)
                    {
                        string travelerFullName = traveler.FirstName + ' ' + traveler.LastName;
                        //Console.WriteLine(travelerFullName);
                        tripToUpdate.AddParticipant(new TripParticipant(p.TravelerId, p.TripId, traveler, tripToUpdate, p.GoingStatus, travelerFullName));
                    }
                }
                //tripToUpdate.Participants = trip.Participants;
                _tripRepository.Update(tripToUpdate);
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

        // Below are 4 api calls that are not used by the client

        // GET: api/trips/id/attractions
        /// <summary>
        /// Get all Attractions of a Trip (currently NOT used by client)
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

        //// vvv CORS vvv ////

        // GET: api/trips/id/attractions/attractionId
        /// <summary>
        /// Get an Attraction of a Trip (currently NOT used by client)
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
        /// Adds an attraction to a trip (currently NOT used by client)
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
        /// Deletes an Attraction of a Trip (currently NOT used by client)
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
