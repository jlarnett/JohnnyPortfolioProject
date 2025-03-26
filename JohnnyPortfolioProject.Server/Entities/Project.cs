using System.ComponentModel.DataAnnotations;

namespace JohnnyPortfolioProject.Server.Entities
{
    public class Project
    {
        public int Id { get; set; }

        [MaxLength(30)]
        public string Name { get; set; } = String.Empty;

        [MaxLength(200)]
        public string GithubUrl { get; set; } = String.Empty;

        [MaxLength(2000)]
        public string Summary { get; set; } = String.Empty;

    }
}
