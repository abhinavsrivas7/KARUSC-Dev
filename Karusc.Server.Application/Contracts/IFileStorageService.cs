﻿using Karusc.Server.Domain;

namespace Karusc.Server.Application.Contracts
{
    public interface IFileStorageService<T> where T : FileEntity
    {
        public string? EnrichmentPrefix { get; }
        Task<string> Upload(File<T> file, CancellationToken cancellationToken);
        Task<Dictionary<Guid, string>> BulkUpload(
            List<File<T>> files, CancellationToken cancellationToken);
        Task Delete(File<T> file, CancellationToken cancellationToken);
        Task BulkDelete(List<File<T>> files, CancellationToken cancellationToken);
    }
}
