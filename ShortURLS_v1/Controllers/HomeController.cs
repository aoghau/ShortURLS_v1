using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using ShortURLs.Data;
using ShortURLS_v1.Utility;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ShortURLS_v1.Controllers
{
    public class HomeController : Controller
    {
        private IConfiguration _config;

        public HomeController(IConfiguration config)
        {
            _config = config;
        }


        [HttpGet("home")]
        public IActionResult OnPageLoaded()
        {        
            using (var context = new ShortUrlDataContext())
            {
                var wrapper = new ListWrapper<ShortUrl>() { List = context.ShortUrls.ToArray() };                
                if (ValidateUser())
                {
                    var user = context.Users.Where(x => x.Name.Equals(ValidatedUserName())).FirstOrDefault();
                    var authresponse = JsonConvert.SerializeObject(user);
                    var combwrapper = new CombinedWrapper<ShortUrl>() { List = context.ShortUrls.ToArray(), WrapName = user.Name, IsWrapAdmin = user.IsAdmin };                    
                    return new JsonResult(combwrapper);
                }
                return new JsonResult(wrapper);
            }            
                
        }

        [HttpDelete("id")]
        public IActionResult OnDelete(int id)
        {
            using (ShortUrlDataContext context = new ShortUrlDataContext())
            {
                var query = context.ShortUrls.Where(x => x.Id == id).FirstOrDefault();
                if (query == null) return BadRequest();
                context.ShortUrls.Remove(query);
                context.SaveChanges();
            }

            return new OkResult();
        }

        [HttpPost("url")]
        public IActionResult AddNewLink(string url)
        {
            using (ShortUrlDataContext context = new ShortUrlDataContext())
            {
                var query = context.ShortUrls.Where(x => x.OriginalUrl.Equals(url)).FirstOrDefault();
                var user = context.Users.Where(x => x.Name.Equals(ValidatedUserName())).FirstOrDefault();
                if (query != null) return BadRequest();
                ShortUrl shortUrl = new ShortUrl() { Author = user.Name, DateCreated = DateTime.UtcNow, OriginalUrl = url, Url = GenerateShortUrl() };
                context.ShortUrls.Add(shortUrl);
                context.SaveChanges();
                return new OkResult();
            }
        }


        private bool ValidateUser()
        {
            if (Request.Headers.TryGetValue("Authorization", out var authHeader))
            {
                var token = authHeader.FirstOrDefault()?.Replace("bearer ", ""); // Remove "Bearer " prefix

                if (!string.IsNullOrEmpty(token))
                {
                    var jwtHandler = new JwtSecurityTokenHandler();

                    var parsedToken = jwtHandler.ReadJwtToken(token);
                    var claims = parsedToken.Claims;

                    // Check if the token contains specific claim to identify an authenticated user
                    var isAuthenticated = claims.Any(c => c.Type == ClaimTypes.NameIdentifier);

                    // Create an info object
                    var info = new { IsAuthenticated = isAuthenticated };

                    return isAuthenticated; // Return the info object in JSON format
                }
            }
            return false;
        }

        private string ValidatedUserName()
        {
            if (Request.Headers.TryGetValue("Authorization", out var authHeader))
            {
                var token = authHeader.FirstOrDefault()?.Replace("bearer ", "");
                if (!string.IsNullOrEmpty(token))
                {
                    var jwtHandler = new JwtSecurityTokenHandler();
                    var parsedToken = jwtHandler.ReadJwtToken(token);
                    Claim usernameClaim = parsedToken.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
                    if (usernameClaim != null) 
                    {
                        string validatedname = usernameClaim.Value;
                        return validatedname;
                    }
                }
            }
            return null;
        }

        private string GenerateShortUrl()
        {
            //string baseUrl = _urlHelper.ActionContext.HttpContext.Request.Scheme + "://" +
            //             _urlHelper.ActionContext.HttpContext.Request.Host +
            //             _urlHelper.ActionContext.HttpContext.Request.PathBase;
            string baseUrl = "localhost:3000/";
            string urlsafe = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
            string shorten = urlsafe.Substring(new Random().Next(0, urlsafe.Length), new Random().Next(2, 6));
            string newurl = baseUrl + shorten;
            return newurl;
        }
    }
}
