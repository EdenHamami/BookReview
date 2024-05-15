//src/api/booksApi.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://localhost:7082/api', // Adjust based on your API URL
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getBooks = () => apiClient.get('/Books');
export const getBookById = (bookId) => apiClient.get(`/Books/${bookId}`);
export const createBook = (bookDto) => apiClient.post('/Books', bookDto);
export const deleteBook = (bookId) => apiClient.delete(`/Books/${bookId}/reviews`);
export const addReview=(bookId,reviewDto)=>apiClient.post( `/Books/${bookId}/reviews`,reviewDto);