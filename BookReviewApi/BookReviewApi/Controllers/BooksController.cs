using BookReviewApi.Data;
using BookReviewApi.DTOs;
using BookReviewApi.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReviewApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookContext _context;

        public BooksController(BookContext context)
        {
            _context = context;
        }

        // GET: api/books
        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetBooks()
        {
            var books = await _context.Books.Find(book => true).ToListAsync();
            return Ok(books);
        }

        // GET: api/books/{bookId}
        [HttpGet("{bookId}")]
        public async Task<ActionResult<Book>> GetBookById(string bookId)
        {
            var book = await _context.Books.Find(book => book.Id == bookId).FirstOrDefaultAsync();
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        // GET: api/books/{bookId}/reviews
        [HttpGet("{bookId}/reviews")]
        public async Task<ActionResult<List<Review>>> GetBookReviews(string bookId)
        {
            var book = await _context.Books.Find(book => book.Id == bookId).FirstOrDefaultAsync();
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book.Reviews.ToList());
        }

        // POST: api/books
        [HttpPost]
        public async Task<ActionResult> CreateBook([FromBody] BookDto bookDto)
        {
            Book book = new Book
            {
                Title = bookDto.Title,
                Description = bookDto.Description,
                Author = bookDto.Author,
                Image = bookDto.Image,
                Category = bookDto.Category,
                Reviews = new List<Review>()
            };
            await _context.Books.InsertOneAsync(book);
            return CreatedAtAction(nameof(GetBookById), new { bookId = book.Id }, book);
        }

        // POST: api/books/{bookId}/reviews
        [HttpPost("{bookId}/reviews")]
        public async Task<ActionResult> AddReview(string bookId, [FromBody] ReviewDto reviewDto)
        {
            var book = await _context.Books.Find(book => book.Id == bookId).FirstOrDefaultAsync();
            if (book == null)
            {
                return NotFound();
            }
            Review review = new Review
            {
                ReviewId = MongoDB.Bson.ObjectId.GenerateNewId().ToString(),
                Rating = reviewDto.Rating,
                Comment = reviewDto.Comment,
                ReviewerName = reviewDto.ReviewerName,
                ReviewDate = DateTime.Now,
            };
            book.Reviews.Add(review);

            await _context.Books.ReplaceOneAsync(b => b.Id == bookId, book);
            return CreatedAtAction(nameof(GetBookReviews), new { bookId = bookId }, review);
        }

        // DELETE: api/books/{bookId}
        [HttpDelete("{bookId}")]
        public async Task<IActionResult> DeleteBook(string bookId)
        {
            var book = await _context.Books.Find(book => book.Id == bookId).FirstOrDefaultAsync();
            if (book == null)
            {
                return NotFound();
            }
            await _context.Books.DeleteOneAsync(b => b.Id == bookId);
            return NoContent();
        }

        // DELETE: api/books/{bookId}/reviews/{reviewId}
        [HttpDelete("{bookId}/reviews/{reviewId}")]
        public async Task<IActionResult> DeleteReview(string bookId, string reviewId)
        {
            var book = await _context.Books.Find(book => book.Id == bookId).FirstOrDefaultAsync();
            if (book == null)
            {
                return NotFound();
            }

            var review = book.Reviews.FirstOrDefault(r => r.ReviewId == reviewId);
            if (review == null)
            {
                return NotFound();
            }

            book.Reviews.Remove(review);
            await _context.Books.ReplaceOneAsync(b => b.Id == bookId, book);
            return NoContent();
        }
    }
}
