namespace Karusc.Server.Domain
{
    public class File<T> : FileEntity where T : FileEntity
    {
        public T Entity { get; init; }
        public Guid EntityId { get; init; }
        public string FileName { get; init; }
        public string FileBase64 { get; init; }
        public File(T entity, string file, string suffix)
        {
            Entity = entity;
            EntityId = entity.Id;
            FileName = $"{entity.Id}/{suffix}";
            FileBase64 = file;
        }

        public File() { }
    }
}
