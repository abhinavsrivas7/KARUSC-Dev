namespace Karusc.Server.Domain
{
    public class File<T> where T : FileEntity
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public T Entity { get; init; }
        public Guid EntityId { get; init; }
        public string FileName { get; internal set; }
        public string FileBase64 { get; init; }
        
        private const string _exceptionMessage = "Invalid Base64";

        #pragma warning disable CS8618
        public File() { }
        #pragma warning restore CS8618

        public File(T entity, string file, string suffix)
        {
            var (fileType, fileExtension, fileContent) = GetFileMetadata(file);
            Entity = entity;
            EntityId = entity.Id;
            
            string fileName = string.IsNullOrEmpty(suffix)
                ? $"{EntityId}-{fileType}.{fileExtension}"
                : $"{EntityId}-{fileType}-{suffix}.{fileExtension}";

            FileName = fileName;
            FileBase64 = fileContent;
        }

        private static (string Type, string Extension, string Content) GetFileMetadata(string file)
        {
            string[] extensionAndFile = file.Split(";");
            
            if (extensionAndFile.Length != 2)
            {
                throw new ArgumentException(_exceptionMessage);
            }

            string[] extensionData = extensionAndFile[0].Split(':');
            string[] fileContentData = extensionAndFile[1].Split(',');
            
            if (extensionData.Length != 2 && fileContentData.Length != 2)
            {
                throw new ArgumentException(_exceptionMessage);
            }

            string[] extension = extensionData[1].Split('/');

            if(extension.Length != 2)
            {
                throw new ArgumentException(_exceptionMessage);
            }

            return (extension[0], extension[1], fileContentData[1]);
        }
    }
}