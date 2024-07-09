import React, { useContext, useEffect, useState } from 'react';
import { Card, Spinner } from 'flowbite-react';
import { AuthContext } from '../../contexts/AuthProvider';

export default function Shop() {
  const { loading } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  // fetching data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/all-books`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setBooks(data);
        setFetching(false);
      })
      .catch(error => {
        console.error("Error fetching books:", error);
        setError(error.message);
        setFetching(false);
      });
  }, [loading]);

  // loader
  if (loading || fetching) {
    return (
      <div className="text-center mt-28">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-28">
        <p className="text-red-500">Error fetching books: {error}</p>
      </div>
    );
  }

  return (
    <div className='my-28 px-4 lg:px-24'>
      <h2 className='text-3xl font-bold text-center mb-16 z-40'>All Books are Available Here</h2>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
        {books.map(book => (
          <Card key={book.id} className="hover:shadow-lg border border-gray-200 rounded-lg overflow-hidden">
            <img src={book.imageURL} alt={book.bookTitle} className='h-96 object-cover w-full' />
            <div className="p-4">
              <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{book.bookTitle}</h5>
              <p className="text-gray-700 dark:text-gray-400">{book.bookDescription}</p>
              <div className="mt-4 flex justify-between items-center">
                <a 
                  href={`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${book.bookPDF}`} 
                  download 
                  className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700'
                  target="_blank" rel="noopener noreferrer"
                >
                  Download
                </a>
                <p className="text-gray-600 dark:text-gray-300">Price: Free</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
