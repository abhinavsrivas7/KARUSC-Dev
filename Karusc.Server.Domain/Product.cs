namespace Karusc.Server.Domain
{
    public class Product : FileEntity
    {
        public string Title { get; private set; }
        public decimal Price { get; private set; }
        public string Description { get; private set; }
        public string Category { get; private set; }
        public List<File<Product>>? Images { get; private set; } = null;

        private Product(string title, decimal price, string description, string category)
        {
            Title = title;
            Price = price;
            Description = description;
            Category = category;
        }

        public static Product Create(
            string title,
            decimal price,
            string description,
            string category,
            List<string>? images)
        {
            if (price < 0)
            {
                throw new InvalidOperationException("Price can't be less than 0");
            }

            var product = new Product(title, price, description, category);

            product.Images = images?
                .Select((image, index) => new File<Product>(product, image, index.ToString()))
                .ToList();

            return product;
        }
    }
}
