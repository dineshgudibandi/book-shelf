import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Card,Button } from 'react-bootstrap';
import { bookShelfAPI } from './constants';
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
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{book.name}</Card.Title>
            <Card.Text>
             {book.description}
            </Card.Text>
            <Button variant="primary"><Link to={`${match.url}/${book.slug}`}>
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