using System.Reflection.Metadata;
using Azure;
using Azure.Identity;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32.SafeHandles;
using System;
using System.Net;
using System.Net.Http.Headers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JohnnyPortfolioProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildsController : ControllerBase
    {
        [HttpGet]
        public async Task<List<string>> Get()
        {
            List<string> blobs = new List<string>();
            var blobServiceClient = new BlobServiceClient(
                new Uri("https://nhablobstore.blob.core.windows.net/"), new DefaultAzureCredential());

            var containerClient = blobServiceClient.GetBlobContainerClient("game-builds");
            await foreach (BlobItem blobItem in containerClient.GetBlobsAsync())
            {
                blobs.Add(blobItem.Name);
            }

            return blobs;
        }


        [HttpGet("Download/{id}")]
        public async Task<FileStreamResult> DownloadBlob(string id)
        {
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            var blobServiceClient = new BlobServiceClient(
                new Uri("https://nhablobstore.blob.core.windows.net/"), new DefaultAzureCredential());
            var containerClient = blobServiceClient.GetBlobContainerClient("game-builds");
            var blobClient = containerClient.GetBlobClient(id);
            var stream = await blobClient.OpenReadAsync();
            return File(stream, "application/octet-stream", $"{id}");
        }
    }
}
