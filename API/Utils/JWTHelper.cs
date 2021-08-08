using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace API
{
    public class JWTHelper
    {
        public string GetUserIdentityFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var claims = handler.ReadJwtToken(token);
            var UserIdentity = claims.Claims.Where(c => c.Type == "Identity").First().Value;
            return UserIdentity;
        }
    }
}