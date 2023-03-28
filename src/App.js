import { Route, Routes } from 'react-router-dom';
import './App.css';
import React, { useEffect, useState } from 'react';
import { EditBook } from './EditBook';
import { AddBook } from './AddBook';
import { Home } from './Home';

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

export default App;
