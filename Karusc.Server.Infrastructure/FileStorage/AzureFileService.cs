using Karusc.Server.Domain;

namespace Karusc.Server.Infrastructure.FileStorage
{
    public class AzureFileService<T> : BaseFileStorageService<T> where T : FileEntity
    {
        public override Task<string> Upload(File<T> file)
        {
            throw new NotImplementedException();
        }

        public override Task<List<string>> BulkUpload(List<File<T>> files)
        {
            throw new NotImplementedException();
        }
    }
}
