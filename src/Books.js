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
import Book from './Book';
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

  return (
    <div>
      <h2>Books</h2>
<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary"><Link to={`${match.url}/test`}>
                                        Test
                                        </Link></Button>
  </Card.Body>
</Card>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:bookId`}>
          <Book />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}
export default Books;