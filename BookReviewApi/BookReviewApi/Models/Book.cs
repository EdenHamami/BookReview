using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace BookReviewApi.Models
{
    public class Book
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Title")]
        public string Title { get; set; }

        [BsonElement("Author")]
        public string Author { get; set; }

        [BsonElement("Description")]
        public string Description { get; set; }

        [BsonElement("PublicationDate")]
        public DateTime PublicationDate { get; set; }

        [BsonElement("Image")]
        public string Image { get; set; }  // URL or base64 string for the image

        [BsonElement("Category")]
        public string Category { get; set; }

        [BsonElement("Reviews")]
        public List<Review> Reviews { get; set; } = new List<Review>();
    }
}
