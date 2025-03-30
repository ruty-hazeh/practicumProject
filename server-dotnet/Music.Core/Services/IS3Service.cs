using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music.Core.Services
{
    public interface IS3Service
    {

        Task<string> UploadFileAsync(Stream fileStream, string fileName);
        Task<Stream> DownloadFileAsync(string fileName);
        Task<bool> DeleteFileAsync(string fileName);
        Task<List<string>> ListFilesAsync();

    }
}
