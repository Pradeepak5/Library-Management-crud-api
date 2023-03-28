import React from 'react';
import { BaseApp } from "./BaseApp";
import { CardDesign } from "./CardDesign";

export function Home({ avlbook, setAvlbook }) {
  return (
    <div>
      <BaseApp />
      <div className='book-details'>
        {avlbook.map((book, index) => {
          return <CardDesign key={index} avlbook={avlbook} setAvlbook={setAvlbook} id={book.id} book={book.book} author={book.author} published={book.published} location={book.location} />;
        })}
      </div>
    </div>
  );
}
