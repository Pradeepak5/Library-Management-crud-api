import { useNavigate } from 'react-router-dom';
import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



export function CardDesign({ avlbook, setAvlbook, book, author, published, location, id }) {

  const navigate = useNavigate();
  const handleDelete = async (idx) => {
    const res = await fetch(`https://6421618086992901b2b1ee2d.mockapi.io/Library-management/${idx}`, {
      method: "DELETE"
    });
    const data = await res.json();

    const alteredBookList = avlbook.filter(book => book.id !== idx);
    setAvlbook(alteredBookList);
  };
  return (
    <Card sx={{ width: 300, textAlign: 'center', fontSize: '.5em' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <Button variant='contained' onClick={() => navigate(`/editbook/${id}`)}>edit</Button>
          <Button variant='contained' color='error' onClick={() => handleDelete(id)}>delete</Button>
        </div>
      </CardContent>
    </Card>
  );
}
