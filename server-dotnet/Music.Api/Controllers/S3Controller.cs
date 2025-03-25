using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

[ApiController]
[Route("api/s3")]
public class S3Controller : ControllerBase
{
    private readonly S3Service _s3Service;

    public S3Controller(S3Service s3Service)
    {
        _s3Service = s3Service;
    }

    // ✅ API להעלאת קובץ
    [HttpPost("upload")]
    [Consumes("multipart/form-data")]

    public async Task<IActionResult> UploadFile([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("File is empty.");

        using var stream = file.OpenReadStream();
        var url = await _s3Service.UploadFileAsync(stream, file.FileName);

        return Ok(new { Url = url });
    }




    // ✅ API להורדת קובץ
    [HttpGet("download/{fileName}")]
    public async Task<IActionResult> DownloadFile(string fileName)
    {
        var stream = await _s3Service.DownloadFileAsync(fileName);
        return File(stream, "application/octet-stream", fileName);
    }


    [HttpDelete("delete/{fileName}")]
    public async Task<IActionResult> DeleteFile(string fileName)
    {
        var success = await _s3Service.DeleteFileAsync(fileName);
        if (!success)
            return NotFound("File not found.");

        return Ok("File deleted successfully.");
    }

    // ✅ API לקבלת רשימת קבצים
    [HttpGet("files")]
    public async Task<IActionResult> ListFiles()
    {
        var files = await _s3Service.ListFilesAsync();
        return Ok(files);
    }
}