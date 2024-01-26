using Karusc.Server.Domain;
using Karusc.Server.Infrastructure.Configuration;
using Microsoft.Extensions.Options;

namespace Karusc.Server.Infrastructure.FileStorage
{
    public class LocalFileStorageService<T> : BaseFileStorageService<T> 
        where T : FileEntity
    {
        private readonly LocalFileStorage _configuration;
        public override string? EnrichmentPrefix => _configuration.Host;

        public LocalFileStorageService(IOptions<LocalFileStorage> options) => 
            _configuration = options.Value;

        public override Task<(Guid FileId, string FileURL)> Upload(File<T> file)
        {
            throw new NotImplementedException();
        }

        public override Task<Dictionary<Guid, string>> BulkUpload(List<File<T>> files)
        {
            throw new NotImplementedException();
        }
    }
}
