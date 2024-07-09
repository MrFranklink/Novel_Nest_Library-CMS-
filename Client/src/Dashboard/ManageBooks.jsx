  import { Table, Pagination } from 'flowbite-react';
  import React, { useEffect, useState } from 'react';
  import { Link } from 'react-router-dom';

  const ManageBooks = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      fetchBooks(currentPage);
    }, [currentPage]);

    const fetchBooks = (page) => {
      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/all-books?page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          setAllBooks(data.books); // Assuming the API returns an object with a `books` array
        });
    };

    const handleDelete = (id) => {
      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/book/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setAllBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
          }
        });
    };

    const onPageChange = (page) => setCurrentPage(page);

    return (
      <div className='px-4 my-12'>
        <h2 className='mb-8 text-3xl font-bold'>Manage Your Books Inventory!</h2>

        <Table className='lg:w-[1180px]'>
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Book Name</Table.HeadCell>
            <Table.HeadCell>Author Name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Edit or Manage</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {allBooks.map((book, index) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={book._id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1 + (currentPage - 1) * 10} {/* Adjust index for pagination */}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {book.bookTitle}
                </Table.Cell>
                <Table.Cell>{book.authorName}</Table.Cell>
                <Table.Cell>{book.category}</Table.Cell>
                <Table.Cell>$10.99</Table.Cell>
                <Table.Cell>
                  <Link
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                    to={`/admin/dashboard/edit-books/${book._id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <div className="flex items-center justify-center text-center mt-8">
          <Pagination
            currentPage={currentPage}
            layout="pagination"
            nextLabel="Go forward"
            onPageChange={onPageChange}
            previousLabel="Go back"
            showIcons
            totalPages={1000} // You should calculate this based on your total books and books per page
          />
        </div>
      </div>
    );
  };

  export default ManageBooks;
