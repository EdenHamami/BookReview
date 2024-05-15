using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BookReviewApi.Models
{
    public class Review
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ReviewId { get; set; }

        [BsonElement("Rating")]
        public int Rating { get; set; }

        [BsonElement("Comment")]
        public string Comment { get; set; }

        [BsonElement("ReviewerName")]
        public string ReviewerName { get; set; }

        [BsonElement("ReviewDate")]
        public DateTime ReviewDate { get; set; }= DateTime.Now;

    }
}
