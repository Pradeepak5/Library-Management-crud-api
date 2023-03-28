import { useNavigate } from 'react-router-dom';
import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export function NavBar() {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <Stack spacing={2} direction="row">
        <Button variant="text" onClick={() => navigate("/")}>Home</Button>
        <Button variant="text" onClick={() => navigate("/addbook")}>Add Book</Button>
      </Stack>
    </div>
  );
}
