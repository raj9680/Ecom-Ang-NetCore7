using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public class AppUser: IdentityUser // IdentityUser<string> bydefault of string type
    {
        public string DisplayName { get; set; }
        public Address Address { get; set; }
    }
}
