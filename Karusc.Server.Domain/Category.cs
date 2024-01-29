namespace Karusc.Server.Domain
{
    public class Category : FileEntity
    {
        public string Name { get; private set; }
        public File<Category>? Image { get; private set; } = null;
        public string? ImageURL { get; private set; } = null;
        public List<Product>? Products { get; private set; } = null;

        private Category(string name) => Name = name;

        public static Category Create(string name, string image)
        {
            var category = new Category(name);
            category.Image = new File<Category>(category, image, string.Empty);
            category.ImageURL = category.Image.FileName;
            return category;
        }

        public Category UpdateImageURL(string imageURL) 
        {
            ImageURL = imageURL;
            return this;
        }
    }
}
