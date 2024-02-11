using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Files;

namespace Karusc.Server.Infrastructure.FileStorage
{
    public abstract class BaseFileStorageService<T> : IFileStorageService<T> 
        where T : FileEntity
    {
        protected string Container {  get; init; }
        protected BaseFileStorageService() => Container = typeof(T).Name;
        public abstract Task<string> Upload(File<T> file, CancellationToken cancellationToken);
        public abstract Task<Dictionary<Guid, string>> BulkUpload(
            List<File<T>> files, CancellationToken cancellationToken);
        public abstract Task Delete(string fileName, CancellationToken cancellationToken);
        public abstract Task BulkDelete(
            List<string> fileNames, CancellationToken cancellationToken);
        public virtual string? EnrichmentPrefix { get => null; }
    }
}