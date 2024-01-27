namespace Karusc.Server.Domain
{
    public abstract class FileEntity
    {
        public Guid Id { get; init; }
        public FileEntity() => Id = Guid.NewGuid();
    }
}
