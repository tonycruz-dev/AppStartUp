﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Core.Entities
{
    public class AppRole: IdentityRole
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
