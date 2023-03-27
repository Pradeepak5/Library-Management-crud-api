import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { object,string } from 'yup';

function App() {
  const [avlbook,setAvlbook] = useState([]);
  useEffect(()=>{
    const bookDetail = async()=>{
      const res = await fetch("https://6421618086992901b2b1ee2d.mockapi.io/Library-management",{
        method:"GET"
      })
      const data =await res.json();
      setAvlbook(data);
    }
    bookDetail();
  },[]);
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home avlbook={avlbook} setAvlbook={setAvlbook} />}/>
        <Route path='/addbook' element={<AddBook avlbook={avlbook} setAvlbook={setAvlbook} /> }/>
        <Route path='/editbook/:id' element={<EditBook avlbook={avlbook} setAvlbook={setAvlbook} />}/>
      </Routes>
    </div>
  );
}

function EditBook({avlbook,setAvlbook}){
  const navigate = useNavigate();
  const {id} = useParams();

  const editedIndex = avlbook.findIndex(book=>book.id === id);

  const bookFormValidateSchema = object({
    id : string().required("Please enter id"),
    book : string().required("Please enter book name"),
    author : string().required("Please enter author"),
    published : string().required("When the book was published"),
    location : string().required("where it published")
  })

  const {values,handleChange,handleBlur,handleSubmit,touched,errors} = useFormik({
    initialValues : {
      id : avlbook[editedIndex].id,
      book : avlbook[editedIndex].book,
      author : avlbook[editedIndex].author,
      published : avlbook[editedIndex].published,
      location : avlbook[editedIndex].location
    },
    validationSchema : bookFormValidateSchema,
    onSubmit : (updateBook) =>{
      updateBooks(updateBook);
       navigate('/')
    }
  })

  const updateBooks = async(updateBook)=>{
    const res = await fetch(`https://6421618086992901b2b1ee2d.mockapi.io/Library-management/${id}`,{
      method : "PUT",
      body : JSON.stringify(updateBook),
      headers : {
        "Content-Type" : "application/json"
      }
    })
    const data = await res.json();
    avlbook[editedIndex] = data;
    setAvlbook([...avlbook]);
  }
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
        <TextField id="outlined-basic" label="ID" variant="outlined" name='id' value={values.id} onChange={handleChange} onBlur={handleBlur} touched/>
        {touched.id && errors.id ? <p style={{color:'crimson'}}>{errors.id}</p> : ""}
        <TextField id="outlined-basic" label="Book Name" variant="outlined" value={values.book} name='book' onChange={handleChange} onBlur={handleBlur} touched/>
        {touched.book && errors.book ? <p style={{color:'crimson'}}>{errors.book}</p> : ""}
        <TextField id="outlined-basic" label="Author" variant="outlined" value={values.author} name='author' onChange={handleChange} onBlur={handleBlur} touched/>
        {touched.author && errors.author ? <p style={{color:'crimson'}}>{errors.author}</p> : ""}
        <TextField id="outlined-basic" label="Published On" variant="outlined" value={values.published} name='published' onChange={handleChange} onBlur={handleBlur} touched/>
        {touched.published && errors.published ? <p style={{color:'crimson'}}>{errors.published}</p> : ""}
        <TextField id="outlined-basic" label="Location" variant="outlined" value={values.location} name='location' onChange={handleChange} onBlur={handleBlur} touched/>
        {touched.location && errors.location ? <p style={{color:'crimson'}}>{errors.location}</p> : ""}
        <Button type='submit' variant='contained'>Update Book</Button>
        
      </Box>
    </div>
  )
}

function AddBook({avlbook,setAvlbook}){

  const navigate = useNavigate();

  const bookFormValidateSchema = object({
    id : string().required("Please enter id"),
    book : string().required("Please enter book name"),
    author : string().required("Please enter author"),
    published : string().required("When the book was published"),
    location : string().required("where it published")
  })

  const {values,handleChange,handleBlur,handleSubmit,touched,errors} = useFormik({
    initialValues : {
      id : "",
      book : "",
      author : "",
      published : "",
      location : ""
    },
    validationSchema : bookFormValidateSchema,
    onSubmit : (newBook) =>{
      AddNewBook(newBook);
       navigate('/')
    }
  })

  const AddNewBook = async(newBook) =>{
    const res = await fetch("https://6421618086992901b2b1ee2d.mockapi.io/Library-management",{
      method : "POST",
      body : JSON.stringify(newBook),
      headers : {
        "Content-Type" : "application/json"
      }
    })
    const data = await res.json();
    setAvlbook([...avlbook,data]);
  }
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
        <TextField id="outlined-basic" label="ID" variant="outlined" name='id' value={values.id} onChange={handleChange} onBlur={handleBlur} touched/>
        {touched.id && errors.id ? <p style={{color:'crimson'}}>{errors.id}</p> : ""}
        <TextField id="outlined-basic" label="Book Name" variant="outlined" value={values.book} name='book' onChange={handleChange} onBlur={handleBlur} touched/>
        {touched.book && errors.book ? <p style={{color:'crimson'}}>{errors.book}</p> : ""}
        <TextField id="outlined-basic" label="Author" variant="outlined" value={values.author} name='author' onChange={handleChange} onBlur={handleBlur} touched/>
        {touched.author && errors.author ? <p style={{color:'crimson'}}>{errors.author}</p> : ""}
        <TextField id="outlined-basic" label="Published On" variant="outlined" value={values.published} name='published' onChange={handleChange} onBlur={handleBlur} touched/>
        {touched.published && errors.published ? <p style={{color:'crimson'}}>{errors.published}</p> : ""}
        <TextField id="outlined-basic" label="Location" variant="outlined" value={values.location} name='location' onChange={handleChange} onBlur={handleBlur} touched/>
        {touched.location && errors.location ? <p style={{color:'crimson'}}>{errors.location}</p> : ""}
        <Button type='submit' variant='contained'>Add Book</Button>
        
      </Box>
    </div>
  )
}

function Home({avlbook,setAvlbook}){
  return (
    <div>
      <BaseApp />
      <div className='book-details'>
        {
          avlbook.map((book,index)=>{
            return <CardDesign key={index} avlbook={avlbook} setAvlbook={setAvlbook} id={book.id} book={book.book} author={book.author} published={book.published} location={book.location}  />
          })
        }
       </div> 
    </div>
  )
}

function BaseApp(){
  return (
    <div>
      <NavBar />
    </div>
  )
}


function CardDesign({avlbook,setAvlbook,book,author,published,location,id}) {

  const navigate = useNavigate();
  const handleDelete  = async(idx) =>{
    const res = await fetch(`https://6421618086992901b2b1ee2d.mockapi.io/Library-management/${idx}`,{
      method:"DELETE"
    })
    const data = await res.json();

    const alteredBookList = avlbook.filter(book=>book.id !== idx)
    setAvlbook(alteredBookList);
  }
  return (
    <Card sx={{ width: 300,textAlign:'center', fontSize:'.5em' }}>
      <CardContent>
        <Typography variant="h5">
          Book Name : {book}
        </Typography>
        <Typography variant="h6" component="div">
          Author : {author}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Published : {published}
        </Typography>
        <Typography variant="body2">
          Location : {location}
        </Typography>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
        <Button variant='contained' onClick={()=>navigate(`/editbook/${id}`)}>edit</Button>
        <Button variant='contained' color='error' onClick={()=>handleDelete(id)}>delete</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function NavBar(){
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <Stack spacing={2} direction="row">
      <Button variant="text" onClick={()=>navigate("/")}>Home</Button>
      <Button variant="text" onClick={()=>navigate("/addbook")}>Add Book</Button>
    </Stack>
    </div>
  )
}

export default App;
