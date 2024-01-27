using Karusc.Server.Domain;

namespace Karusc.Server.Application.Contracts
{
    public interface IFileStorageService<T> where T : FileEntity
    {
        public string? EnrichmentPrefix { get; }
        Task<(Guid FileId, string FileURL)> Upload(File<T> file, CancellationToken cancellationToken);
        Task<Dictionary<Guid, string>> BulkUpload(List<File<T>> files, CancellationToken cancellationToken);
    }
}
