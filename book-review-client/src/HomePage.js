import React, { useEffect, useState } from "react";
import { getBooks } from "./api/BooksApi";
import BooksList from "./BooksList";
import "./HomePage.css";
import { Link } from "react-router-dom";
function HomePage() {
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inputText, setInputText] = useState("");
  const [relevantBooks,setRelevantBooks]=useState([])
  const fetchBooks = async () => {
    const response = await getBooks();
    const booksData = response.data;
    const categories = Array.from(
      new Set(booksData.map((book) => book.category))
    );
    setCategories(categories);
    setBooks(response.data);
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  useEffect(() => {
    if (books) {
      let currentBooks = [...books];
      // Search
      console.log(selectedCategories);
      currentBooks = currentBooks.filter((b) =>
        b.title.toLowerCase().startsWith(inputText.toLowerCase())
      );
      // Filter
      if (selectedCategories.length > 0) {
        currentBooks = currentBooks.filter((b) =>
          selectedCategories.includes(b.category)
        );
      }
      setRelevantBooks(currentBooks);
    }
  }, [books, selectedCategories, inputText]);
  const handleCategoryClick = (category) => {
    let updatedCategories = [...selectedCategories];
    if (selectedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter((c) => c !== category);
    } else {
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);
  };
  if (!books) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="homePage">
        <div className="left-side">
          {categories.map((category,index) => (
            <div key={index}  
            className={`category-item ${
              selectedCategories.includes(category) ? "selected" : ""
            }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <div className="right-side">
          <div className="top">
          <Link to="/addBook">
              <button>Add Book</button>
            </Link>
                        <input
              type="text"
              className="search-book"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className="bottom">
            <BooksList relevantBooks={relevantBooks} />
          </div>
        </div>
      </div>
    );
  }
}
export default HomePage;
