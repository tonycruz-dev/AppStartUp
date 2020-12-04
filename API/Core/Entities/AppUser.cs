using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Core.Entities
{
    public class AppUser : IdentityUser
    {
        public string Occupation { get; set; }
        public string Avatar { get; set; }
        public string NickName { get; set; }

        public Collection<Customer> Customers { get; set; }
        //public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
