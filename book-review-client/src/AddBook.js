import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from './api/BooksApi';
import './AddBook.css';

function AddBook() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image && !imageFile) {
      alert('Please provide either an image URL or upload an image.');
      return;
    }

    let imageData = image;

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        imageData = reader.result;
        await createBook({ title, author, description, category, image: imageData });
        navigate('/'); // Redirect to home page
      };
      reader.readAsDataURL(imageFile);
    } else {
      await createBook({ title, author, description, category, image: imageData });
      navigate('/'); // Redirect to home page
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage('');
    }
  };

  const handleImageUrlChange = (e) => {
    setImage(e.target.value);
    setImageFile(null);
  };

  return (
    <div className='add-book-container'>
      <div className='add-book'>
        <h1>Add a New Book</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              value={image}
              onChange={handleImageUrlChange}
              disabled={imageFile !== null}
            />
          </div>
          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={image !== ''}
            />
          </div>
          <button type="submit" className="submit-button">Add Book</button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
