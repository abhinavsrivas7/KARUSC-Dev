namespace Karusc.Server.Domain.Files
{
    public abstract class FileEntity
    {
        public Guid Id { get; init; }
        public FileEntity() => Id = Guid.NewGuid();
    }
}
