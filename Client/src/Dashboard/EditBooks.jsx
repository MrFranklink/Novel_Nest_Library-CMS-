import React, { useState } from 'react';
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
import { useLoaderData, useParams } from 'react-router-dom';

const EditBooks = () => {
  const { id } = useParams();
  const { bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL } = useLoaderData();

  const bookCategories = [
    "Fiction", "Non-fiction", "Mystery", "Programming", "Science fiction",
    "Fantasy", "Horror", "Biography", "Autobiography", "History",
    "Self-help", "Business", "Memoir", "Poetry", "Children's books",
    "Travel", "Religion and spirituality", "Science", "Art and design",
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(category);
  const [bookPDF, setBookPDF] = useState(null);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleFileChange = (event) => {
    setBookPDF(event.target.files[0]);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;

    const formData = new FormData();
    formData.append('bookTitle', bookTitle);
    formData.append('authorName', authorName);
    formData.append('imageURL', imageURL);
    formData.append('category', category);
    formData.append('bookDescription', bookDescription);
    if (bookPDF) {
      formData.append('bookPDF', bookPDF);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/book/${id}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      alert("Book updated successfully!");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Edit Book</h2>
      <form className="flex flex-col gap-6" onSubmit={handleUpdate}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <Label htmlFor="bookTitle" value="Book Title" />
            <TextInput
              id="bookTitle"
              placeholder="Enter Book Title"
              required
              type="text"
              name='bookTitle'
              defaultValue={bookTitle}
            />
          </div>

          <div>
            <Label htmlFor="authorName" value="Author Name" />
            <TextInput
              id="authorName"
              placeholder="Enter Author Name"
              required
              type="text"
              name='authorName'
              defaultValue={authorName}
            />
          </div>

          <div>
            <Label htmlFor="imageURL" value="Book Image URL" />
            <TextInput
              id="imageURL"
              placeholder="Enter Image URL"
              required
              type="text"
              name='imageURL'
              defaultValue={imageURL}
            />
          </div>

          <div>
            <Label htmlFor="inputState" value="Book Category" />
            <Select
              id="inputState"
              name="categoryName"
              className="rounded"
              value={selectedBookCategory}
              onChange={handleChangeSelectedValue}
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="bookDescription" value="Book Description" />
          <Textarea
            id="bookDescription"
            placeholder="Enter Book Description"
            required
            type="text"
            name='bookDescription'
            rows={4}
            defaultValue={bookDescription}
          />
        </div>

        <div>
          <Label htmlFor="bookPDF" value="Upload Book PDF (Optional)" style={styles.fileLabel} />
          <input
            id="bookPDF"
            type="file"
            name="bookPDF"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>

        <Button type="submit" className='mt-8'>Update Book</Button>
      </form>
    </div>
  );
};

export default EditBooks;

const styles = {
  fileLabel: {
    display: 'inline-block',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    marginRight: '10px',
  },
};
