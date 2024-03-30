using Karusc.Server.Domain.Files;

namespace Karusc.Server.Domain.Products
{
    public class Collection : FileEntity, ISearchableEntity
    {
        public string Name { get; private set; }
        public File<Collection> Image { get; private set; } = new();
        public string ImageURL { get; set; } = string.Empty;
        public List<Product> Products { get; private set; } = new();

        private Collection(string name) => Name = name;

        public static Collection Create(string name, string image)
        {
            var collection = new Collection(name);
            collection.Image = new File<Collection>(collection, image, string.Empty);
            collection.ImageURL = collection.Image.FileName;
            return collection;
        }
    }
}
