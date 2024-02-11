using Karusc.Server.Domain.File;

namespace Karusc.Server.Domain.Product
{
    public class Collection : FileEntity
    {
        public string Name { get; private set; }
        public File<Collection>? Image { get; private set; } = null;
        public string? ImageURL { get; set; } = null;
        public List<Product>? Products { get; private set; } = null;

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
