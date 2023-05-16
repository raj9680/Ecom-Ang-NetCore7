using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        //[RegularExpression("any expression goes here", ErrorMessage = "Password must ")]
        public string Password { get; set; }
    }
}
