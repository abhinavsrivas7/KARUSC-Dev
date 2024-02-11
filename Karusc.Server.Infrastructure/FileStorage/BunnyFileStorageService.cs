using BunnyCDN.Net.Storage;
using Karusc.Server.Domain.Files;
using Karusc.Server.Infrastructure.Configuration;
using Microsoft.Extensions.Options;

namespace Karusc.Server.Infrastructure.FileStorage
{
    public class BunnyFileStorageService<T> : BaseFileStorageService<T> 
        where T : FileEntity
    {
        private readonly BunnyFileStorage _configuration;
        private readonly BunnyCDNStorage _client;
        public override string? EnrichmentPrefix => _configuration.CDN_URL;

        public BunnyFileStorageService(IOptions<BunnyFileStorage> options)
        {
            _configuration = options.Value;

            _client = new(_configuration.StorageZone, 
                _configuration.AccessKey, 
                _configuration.Region);
        } 
  
        public override async Task<string> Upload(
            File<T> file, CancellationToken cancellationToken)
        {
            if (!cancellationToken.IsCancellationRequested)
            {
                await UploadFileAsync(file);
                return $"/{Container}/{file.FileName}";
            }
            
            throw new TaskCanceledException();
        }

        public override async Task<Dictionary<Guid,string>> BulkUpload(
            List<File<T>> files, CancellationToken cancellationToken)
        {
            if (!cancellationToken.IsCancellationRequested)
            {
                await Task.WhenAll(files.Select(UploadFileAsync));

                return files
                    .Select(file => new KeyValuePair<Guid, string>(
                        file.Id,
                        $"/{Container}/{file.FileName}"))
                    .ToDictionary();
            }

            throw new TaskCanceledException();
        }       

        public override async Task Delete(
            string fileName, CancellationToken cancellationToken)
        {
            if (!cancellationToken.IsCancellationRequested)
            {
                await _client.DeleteObjectAsync(GetCompleteFileName(fileName, false));
            }
            else
            {
                throw new TaskCanceledException();
            }
        }

        public override async Task BulkDelete(
            List<string> fileNames, CancellationToken cancellationToken)
        {
            if(!cancellationToken.IsCancellationRequested)
            {
                await Task.WhenAll(fileNames.Select(fileName => 
                    _client.DeleteObjectAsync(GetCompleteFileName(fileName, false))));
            }
            else
            {
                throw new TaskCanceledException();
            }
        }

        private async Task UploadFileAsync(File<T> file)
        {            
            using (var stream = new MemoryStream(Convert.FromBase64String(file.FileBase64)))
            {
                await _client.UploadAsync(stream, GetCompleteFileName(file.FileName));
            }
        }

        private string GetCompleteFileName(string fileName, bool appendContainer = true) =>
            appendContainer 
                ? $"{_configuration.StorageZone}/{Container}/{fileName}"
                : $"{_configuration.StorageZone}/{fileName}";
    }
}
