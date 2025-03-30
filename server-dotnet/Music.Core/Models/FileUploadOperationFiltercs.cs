using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

public class FileUploadOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        // אם יש לנו פרמטר של IFormFile
        var fileParameters = operation.Parameters
            .Where(p => p.Schema?.Type == "string" && p.Schema?.Format == "binary")
            .ToList();

        foreach (var fileParameter in fileParameters)
        {
            fileParameter.Description = "File to upload"; // תיאור כללי לקובץ
            fileParameter.Required = true; // אם ברצונך שזה יהיה פרמטר חובה
        }
    }
}
