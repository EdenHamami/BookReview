using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace BookReviewApi.DTOs
{
    public class ReviewDto
    {
        public int Rating { get; set; }
        public string Comment { get; set; }
        public string ReviewerName { get; set; }
    }
}
