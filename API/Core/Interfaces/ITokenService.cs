using API.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Core.Interfaces
{
   public interface ITokenService
   {
        string CreateToken(AppUser user);
        Task<string> CreateTokenAsync(AppUser user);
    }
}
