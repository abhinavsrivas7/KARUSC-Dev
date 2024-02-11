namespace Karusc.Server.Domain.File
{
    public abstract class FileEntity
    {
        public Guid Id { get; init; }
        public FileEntity() => Id = Guid.NewGuid();
    }
}
