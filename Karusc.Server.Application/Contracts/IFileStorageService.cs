using Karusc.Server.Domain;

namespace Karusc.Server.Application.Contracts
{
    public interface IFileStorageService<T> where T : FileEntity
    {
        Task<string> Upload(File<T> file);
        Task<List<string>> BulkUpload(List<File<T>> files);
    }
}
