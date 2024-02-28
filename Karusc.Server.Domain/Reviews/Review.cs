using Karusc.Server.Domain.Users;

namespace Karusc.Server.Domain.Reviews
{
    public class Review
    {
        public Guid Id { get; private set; } = new Guid();
        public User? Author { get; private set; }
        public Guid? AuthorId { get; private set; }
        public string Title { get; private set; }
        public Rating Rating { get; private set; }

        private Review(string title, Rating rating) 
        {
            Title = title;
            Rating = rating;
        }

        public static Review Create(
            User currentUser,
            string title,
            Rating rating)
        {
            if (((int)rating) < 1 || ((int)rating) > 5)
            {
                throw new Exception("Rating can only be between 1 to 5");
            }

            var review = new Review(title, rating);
            review.Author = currentUser;
            review.AuthorId = review.Author.Id;
            return review;
        }

        public bool IsDeleteableBy(User user) => user.Id == AuthorId;
    }
}
