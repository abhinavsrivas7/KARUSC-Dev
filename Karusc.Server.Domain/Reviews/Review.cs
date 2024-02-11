using Karusc.Server.Domain.Users;

namespace Karusc.Server.Domain.Reviews
{
    public class Review
    {
        public Guid Id { get; private set; } = new Guid();
        public User? Author { get; private set; }
        public Guid? AuthorId { get; private set; }
        public string Title { get; private set; }
        public string? Content { get; private set; }
        public Rating Rating { get; private set; }

        private Review(string title, string? content, Rating rating) 
        {
            Title = title;
            Content = content;
            Rating = rating;
        }

        public static Review Create(
            User author,
            string title,
            string? content,
            Rating rating)
        {
            var review = new Review(title, content, rating);
            review.Author = author;
            review.AuthorId = review.Author.Id;
            return review;
        }
    }
}
