using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;

namespace Karusc.Server.Infrastructure.FileStorage
{
    public abstract class BaseFileStorageService<T> : IFileStorageService<T> 
        where T : FileEntity
    {
        protected string Container {  get; init; }
        protected BaseFileStorageService() => Container = typeof(T).Name;
        public abstract Task<(Guid FileId, string FileURL)> Upload(File<T> file);
        public abstract Task<Dictionary<Guid, string>> BulkUpload(List<File<T>> files);
        public virtual string? EnrichmentPrefix { get => null; }
    }
}
