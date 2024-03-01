namespace Karusc.Server.Domain.Products
{
    public interface ISearchableEntity
    {
        public Guid Id { get; }
        public string Name { get; }
    }
}
