using BookReviewApi.Configurations;
using BookReviewApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BookReviewApi.Data
{
    public class BookContext
    {
        private readonly IMongoDatabase _database;

        public BookContext(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public IMongoCollection<Book> Books => _database.GetCollection<Book>("books");
    }
}
