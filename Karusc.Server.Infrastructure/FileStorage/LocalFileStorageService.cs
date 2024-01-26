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

        public override async Task<(Guid FileId, string FileURL)> Upload(File<T> file)
        {
            await UploadFileAsync(file);
            return (file.Id, $"/{Container}/{file.FileName}");
        }

        public override async Task<Dictionary<Guid, string>> BulkUpload(List<File<T>> files)
        {
            await Task.WhenAll(files.Select(UploadFileAsync));
            return files.Select(file => new 
                            KeyValuePair<Guid, string>(file.Id, $"/{Container}/{file.FileName}"))
                        .ToDictionary();
        }
            
        private async Task UploadFileAsync(File<T> file)
        {
            string directoryPath = $"{_configuration.DirectoryPath}/{Container}";
            string filePath = $"{directoryPath}/{file.FileName}";
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
            await File.WriteAllBytesAsync(filePath, Convert.FromBase64String(file.FileBase64));
        }
    }
}
