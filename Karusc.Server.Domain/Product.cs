namespace Karusc.Server.Domain
{
    public class Product : FileEntity
    {
        public string Title { get; private set; }
        public decimal Price { get; private set; }
        public string Description { get; private set; }
        public List<Category>? Categories { get; private set; } = null;
        public List<Collection>? Collections { get; private set; } = null;

        public List<File<Product>>? Images { get; private set; } = null;

        private Product(string title, decimal price, string description)
        {
            Title = title;
            Price = price;
            Description = description;
        }

        public static Product Create(
            string title,
            decimal price,
            string description,
            List<string>? images,
            List<Category>? categories,
            List<Collection>? collections)
        {
            if (price < 0)
            {
                throw new InvalidOperationException("Price can't be less than 0");
            }

            var product = new Product(title, price, description);

            product.Images = images?
                .Select((image, index) => new File<Product>(product, image, index.ToString()))
                .ToList();

            product.Categories = categories;
            product.Collections = collections;
            return product;
        }

        public void UpdateImageNames(Dictionary<Guid, string> imageFileNames) => Images?
            .ForEach(image => image.FileName = imageFileNames.ContainsKey(image.Id) 
                ? imageFileNames[image.Id] 
                : image.FileName);
    }
}
