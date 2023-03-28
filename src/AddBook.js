import { useNavigate } from 'react-router-dom';
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { BaseApp } from "./BaseApp";

export function AddBook({ avlbook, setAvlbook }) {

  const navigate = useNavigate();

  const bookFormValidateSchema = object({
    id: string().required("Please enter id"),
    book: string().required("Please enter book name"),
    author: string().required("Please enter author"),
    published: string().required("When the book was published"),
    location: string().required("where it published")
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      id: "",
      book: "",
      author: "",
      published: "",
      location: ""
    },
    validationSchema: bookFormValidateSchema,
    onSubmit: (newBook) => {
      AddNewBook(newBook);
      navigate('/');
    }
  });

  const AddNewBook = async (newBook) => {
    const res = await fetch("https://6421618086992901b2b1ee2d.mockapi.io/Library-management", {
      method: "POST",
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    setAvlbook([...avlbook, data]);
  };
  return (
    <div>
      <BaseApp />
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        className='add-book-form'
        onSubmit={handleSubmit}
      >
        <TextField id="outlined-basic" label="ID" variant="outlined" name='id' value={values.id} onChange={handleChange} onBlur={handleBlur} touched />
        {touched.id && errors.id ? <p style={{ color: 'crimson' }}>{errors.id}</p> : ""}
        <TextField id="outlined-basic" label="Book Name" variant="outlined" value={values.book} name='book' onChange={handleChange} onBlur={handleBlur} touched />
        {touched.book && errors.book ? <p style={{ color: 'crimson' }}>{errors.book}</p> : ""}
        <TextField id="outlined-basic" label="Author" variant="outlined" value={values.author} name='author' onChange={handleChange} onBlur={handleBlur} touched />
        {touched.author && errors.author ? <p style={{ color: 'crimson' }}>{errors.author}</p> : ""}
        <TextField id="outlined-basic" label="Published On" variant="outlined" value={values.published} name='published' onChange={handleChange} onBlur={handleBlur} touched />
        {touched.published && errors.published ? <p style={{ color: 'crimson' }}>{errors.published}</p> : ""}
        <TextField id="outlined-basic" label="Location" variant="outlined" value={values.location} name='location' onChange={handleChange} onBlur={handleBlur} touched />
        {touched.location && errors.location ? <p style={{ color: 'crimson' }}>{errors.location}</p> : ""}
        <Button type='submit' variant='contained'>Add Book</Button>

      </Box>
    </div>
  );
}
