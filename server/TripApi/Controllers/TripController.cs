using Microsoft.AspNetCore.Mvc;
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
    }
}
