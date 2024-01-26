using BunnyCDN.Net.Storage;
using Karusc.Server.Domain;
using Karusc.Server.Infrastructure.Configuration;
using Microsoft.Extensions.Options;

namespace Karusc.Server.Infrastructure.FileStorage
{
    public class BunnyFileStorageService<T> : BaseFileStorageService<T> where T : FileEntity
    {
        private readonly BunnyFileStorage _configuration;
        private readonly BunnyCDNStorage _client;
        public override string? EnrichmentPrefix => _configuration.CDN_URL;

        public BunnyFileStorageService(IOptions<BunnyFileStorage> options)
        {
            _configuration = options.Value;
            _client = new(_configuration.StorageZone, _configuration.AccessKey, _configuration.Region);
        } 
  
        public override async Task<(Guid FileId, string FileURL)> Upload(File<T> file)
        {
            await UploadFileAsync(file);
            return (file.Id, $"{Container}/{file.FileName}");
        }

        public override async Task<Dictionary<Guid,string>> BulkUpload(List<File<T>> files)
        {
            await Task.WhenAll(files.Select(UploadFileAsync));          
            
            return files.Select(file => new 
                            KeyValuePair<Guid, string>(file.Id, $"/{Container}/{file.FileName}"))
                        .ToDictionary();
        }

        private async Task UploadFileAsync(File<T> file)
        {
            string fileName = $"{_configuration.StorageZone}/{Container}/{file.FileName}";
            
            using (var stream = new MemoryStream(Convert.FromBase64String(file.FileBase64)))
            {
                await _client.UploadAsync(stream, fileName);
            }
        }
    }
}
