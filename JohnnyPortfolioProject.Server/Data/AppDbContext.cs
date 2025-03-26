using JohnnyPortfolioProject.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace JohnnyPortfolioProject.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<ContactRequest> ContactRequests { get; set; }
    }
}
