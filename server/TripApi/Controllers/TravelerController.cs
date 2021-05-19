using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TripApi.DTOs;
using TripApi.Models;

namespace TripApi.Controllers
{
    [ApiConventionType(typeof(DefaultApiConventions))]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class TravelerController : ControllerBase
    {
        private readonly ITravelerRepository _travelerRepository;

        public TravelerController(ITravelerRepository travelerRepository)
        {
            _travelerRepository = travelerRepository;
        }

        /// <summary>
        /// Get the details of the authenticated traveler
        /// </summary>
        /// <returns>the traveler</returns>
        [HttpGet()]
        public ActionResult<IEnumerable<TravelerDTO>> GetTraveler()
        {
            Traveler traveler = _travelerRepository.GetBy(User.Identity.Name);
            // I'm using a list so I can use a BehaviorSubject
            // I know there will be better ways, but getting better at smth takes time
            // and time is smth we're always short on
            var travelerList = new List<TravelerDTO>();
            travelerList.Add(new TravelerDTO(traveler));
            return travelerList;
        }
        //[HttpGet()]
        //public ActionResult<TravelerDTO> GetTraveler()
        //{
        //    Traveler traveler = _travelerRepository.GetBy(User.Identity.Name);
        //    return new TravelerDTO(traveler);
        //}
    }
}
