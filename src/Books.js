import { useState, useEffect } from 'react';
import {
  Link,
  useRouteMatch
} from "react-router-dom";
import { Card,Button } from 'react-bootstrap';
import { bookShelfAPI,baseUrl } from './constants';
const Books = () => {
  let match = useRouteMatch();
  const [books,setBooks] = useState([]);
useEffect(() => {

fetch(bookShelfAPI)
      .then(res => res.json())
      .then(
        (result) => {
          setBooks(result);
        },
        (error) => {

        }
      )
  },[]);
const bookShelf = books.map((book) =>
        <Card style={{ width: '18rem' }} key={book.slug} >
          <Card.Body>
            <Card.Title>{book.name}</Card.Title>
            <Card.Text>
             {book.description}
            </Card.Text>
            <Button><Link to={{ pathname:`${baseUrl}/book/${book.slug}`, state:{book}}}>
                                                Read
                                                </Link></Button>
          </Card.Body>
        </Card>
    );
  return (
    <div>
      <h2>Books</h2>
      {books.length > 0 && bookShelf}
    </div>
  );
}
export default Books;