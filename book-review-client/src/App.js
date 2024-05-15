import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AddBook from './AddBook';
import BookPage from './BookPage';
import AddReview from './AddReview';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/addBook' element={<AddBook />} />
          <Route path='/book/:id' element={<BookPage />} />
          <Route path='/book/:id/addReview' element={<AddReview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
