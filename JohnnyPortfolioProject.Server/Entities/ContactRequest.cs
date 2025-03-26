using System.ComponentModel.DataAnnotations;

namespace JohnnyPortfolioProject.Server.Entities
{
    public class ContactRequest
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Name { get; set; } = String.Empty;

        [MaxLength(500)]
        public string EmailAddress { get; set; } = String.Empty;

        [MaxLength(5000)]
        public string Message { get; set; } = String.Empty;

        [MaxLength(100)]
        public string Importance { get; set; } = String.Empty;

        [MaxLength(100)]
        public string Urgency { get; set; } = String.Empty;
    }
}
