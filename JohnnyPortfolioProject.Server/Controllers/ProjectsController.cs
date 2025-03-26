using Azure.Identity;
using JohnnyPortfolioProject.Server.Data;
using JohnnyPortfolioProject.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace JohnnyPortfolioProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Project>> Get()
        {
            return await _context.Projects.ToListAsync();
        }
    }
}
