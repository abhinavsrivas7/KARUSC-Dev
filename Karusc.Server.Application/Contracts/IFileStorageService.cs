using Karusc.Server.Domain;

namespace Karusc.Server.Application.Contracts
{
    public interface IFileStorageService<T> where T : FileEntity
    {
        Task<(Guid FileId, string FileURL)> Upload(File<T> file);
        Task<Dictionary<Guid, string>> BulkUpload(List<File<T>> files);
    }
}
