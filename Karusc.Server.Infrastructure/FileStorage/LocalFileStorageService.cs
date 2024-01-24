using Karusc.Server.Domain;
using Karusc.Server.Infrastructure.Configuration;
using Microsoft.Extensions.Options;

namespace Karusc.Server.Infrastructure.FileStorage
{
    public class LocalFileStorageService<T> : BaseFileStorageService<T> 
        where T : FileEntity
    {
        private readonly LocalFileStorage _configuration;

        public LocalFileStorageService(IOptions<LocalFileStorage> options) => 
            _configuration = options.Value;

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
