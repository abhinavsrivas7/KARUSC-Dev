namespace Karusc.Server.Domain
{
    public class Product
    {
        public Guid Id { get; init; }
        public string Title { get; init; }
        public decimal Price { get; init; }
        public string Description { get; init; }
        public string Category { get; init; }
        public string Image { get; init; }

        private Product(
            Guid id,
            string title,
            decimal price,
            string description,
            string category,
            string image)
        {
            Id = id;
            Title = title;
            Price = price;
            Description = description;
            Category = category;
            Image = image;
        }

        public static Product Create(
            string title,
            decimal price,
            string description,
            string category,
            string image)
        {
            if(price < 0) throw new InvalidOperationException("price cant be less than 0");
            return new Product(Guid.NewGuid(), title, price, description, category, image);
        }
    }
}
