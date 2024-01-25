namespace Karusc.Server.Domain
{
    public class File<T> where T : FileEntity
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public T Entity { get; init; }
        public Guid EntityId { get; init; }
        public string FileName { get; init; }
        public string FileBase64 { get; init; }
        public File(T entity, string file, string suffix)
        {
            Entity = entity;
            EntityId = entity.Id;
            FileName = GetFileName(EntityId, file, suffix);
            FileBase64 = file;
        }

        private static string GetFileName(Guid entityId, string file, string suffix) => string.Empty;

        public File() { }
    }
}
