using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Music.Core.Services;
public class S3Service: IS3Service
{
    private readonly AmazonS3Client _s3Client;
    private readonly string _bucketName;

    public S3Service(IConfiguration configuration)
    {
        _bucketName = configuration["AWS:S3:BucketName"];
        string accessKey = configuration["AWS:AccessKey"];
        string secretKey = configuration["AWS:SecretKey"];
        string region = configuration["AWS:Region"];

        _s3Client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.GetBySystemName(region));
    }

    //public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
    //{
    //    var request = new TransferUtilityUploadRequest
    //    {
    //        InputStream = fileStream,
    //        Key = fileName,
    //        BucketName = _bucketName,
    //        CannedACL = S3CannedACL.PublicRead
    //    };

    //    var transferUtility = new TransferUtility(_s3Client);
    //    await transferUtility.UploadAsync(request);

    //    return $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
    //}


    public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
    {
        try
        {
            var request = new TransferUtilityUploadRequest
            {
                InputStream = fileStream,
                Key = fileName,
                BucketName = _bucketName,
                CannedACL = S3CannedACL.PublicRead
            };

            var transferUtility = new TransferUtility(_s3Client);
            await transferUtility.UploadAsync(request);

            return $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
        }
        catch (AmazonS3Exception s3Ex)
        {
            // טיפול בשגיאות ספציפיות של S3
            // לדוגמה: הרשאות, bucket לא קיים, וכו'
            throw new Exception($"S3 error occurred: {s3Ex.Message}", s3Ex);
        }
        catch (Exception ex)
        {
            // טיפול בחריגות כלליות
            throw new Exception($"Upload failed: {ex.Message}", ex);
        }
    }


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
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

}