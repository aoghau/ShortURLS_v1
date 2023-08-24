using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortURLs.Data
{
    public class ShortUrl
    {
        [Key]
        public int Id { get; set; }
        public string Author { get; set; }
        public string OriginalUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public string Url { get; set; }

        public ShortUrl() { }
    }
}