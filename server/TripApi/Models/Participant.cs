namespace TripApi.Models
{
    public class Participant
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int GoingStatus { get; set; }

        public Participant(int userId, int goingStatus)
        {
            UserId = userId;
            GoingStatus = goingStatus;
        }
    }
}
