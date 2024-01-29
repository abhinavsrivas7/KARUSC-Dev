using Karusc.Server.Domain;
using Karusc.Server.Infrastructure.Configuration;
using Microsoft.Extensions.Options;

namespace Karusc.Server.Infrastructure.FileStorage
{
    public class LocalFileStorageService<T> : BaseFileStorageService<T> 
        where T : FileEntity
    {
        private readonly LocalFileStorage _configuration;
        public override string? EnrichmentPrefix => string.Concat(
            _configuration.Host, _configuration.RequestPath);

        public LocalFileStorageService(IOptions<LocalFileStorage> options) => 
            _configuration = options.Value;

        public override async Task<string> Upload(
            File<T> file, CancellationToken cancellationToken)
        {
            await UploadFileAsync(file, cancellationToken);
            return $"/{Container}/{file.FileName}";
        }

        public override async Task<Dictionary<Guid, string>> BulkUpload(
            List<File<T>> files, CancellationToken cancellationToken)
        {
            await Task.WhenAll(files.Select(file => UploadFileAsync(file, cancellationToken)));
            
            return files
                .Select(file => new KeyValuePair<Guid, string>(
                    file.Id, 
                    $"/{Container}/{file.FileName}"))
                .ToDictionary();
        }
            
        private async Task UploadFileAsync(
            File<T> file, CancellationToken cancellationToken)
        {
            Directory.CreateDirectory(Path.Combine(_configuration.DirectoryPath, Container));
            
            await File.WriteAllBytesAsync(
                Path.Combine(_configuration.DirectoryPath, Container, file.FileName), 
                Convert.FromBase64String(file.FileBase64));
        }

        public override Task Delete(
            string fileName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public override Task BulkDelete(
            List<string> fileNames, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
