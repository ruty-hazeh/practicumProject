using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;

public class S3Service
{
    private readonly IAmazonS3 _s3Client;
    private readonly string _bucketName;

    public S3Service(IAmazonS3 s3Client, IConfiguration configuration)
    {
        _s3Client = s3Client;
        _bucketName = configuration["AWS:S3:BucketName"];
    }

    // ✅ פונקציה להעלאת קובץ ל-S3
    public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
    {
        var request = new TransferUtilityUploadRequest
        {
            InputStream = fileStream,
            Key = fileName,
            BucketName = _bucketName,
            CannedACL = S3CannedACL.Private // ✅ שמירה על פרטיות הקובץ افتراضي
        };

        var transferUtility = new TransferUtility(_s3Client);
        await transferUtility.UploadAsync(request);

        return $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
    }

    // ✅ פונקציה להורדת קובץ מ-S3
    public async Task<Stream> DownloadFileAsync(string fileName)
    {
        var request = new GetObjectRequest
        {
            BucketName = _bucketName,
            Key = fileName
        };

        var response = await _s3Client.GetObjectAsync(request);
        return response.ResponseStream;
    }


    public async Task<bool> DeleteFileAsync(string fileName)
    {
        try
        {
            var request = new DeleteObjectRequest
            {
                BucketName = _bucketName,
                Key = fileName
            };

            var response = await _s3Client.DeleteObjectAsync(request);
            return response.HttpStatusCode == HttpStatusCode.NoContent; // בדוק אם המחיקה הצליחה
        }
        catch (Exception ex)
        {
            // אפשר ללוג את השגיאה כאן אם תרצה
            return false;
        }
    }

    // ✅ פונקציה לקבלת רשימת הקבצים ב-S3
    public async Task<List<string>> ListFilesAsync()
    {
        var request = new ListObjectsV2Request
        {
            BucketName = _bucketName
        };

        var response = await _s3Client.ListObjectsV2Async(request);
        var fileNames = new List<string>();

        foreach (var obj in response.S3Objects)
        {
            fileNames.Add(obj.Key);
        }

        return fileNames;
    }
}