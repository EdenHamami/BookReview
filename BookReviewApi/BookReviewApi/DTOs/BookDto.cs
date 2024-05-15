using System;
using System.Collections.Generic;

namespace BookReviewApi.DTOs
{
    public class BookDto
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }  // URL or base64 string for the image
        public string Category { get; set; }
      
    }
}
