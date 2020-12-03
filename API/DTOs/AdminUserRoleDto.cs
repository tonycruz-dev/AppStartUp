﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AdminUserRoleDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Roles { get; set; }
    }
    public class AdminListDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string NickName { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; } = new List<string>();
    }
}
