import { useState, useEffect } from 'react';

import {
  useLocation,
  useRouteMatch,
  Link
} from "react-router-dom";
import { Nav } from 'react-bootstrap';

const Book = () => {
  const location = useLocation()
  const book = location.state?.book;
  let match = useRouteMatch();
   const [mybook,setMybook] = useState([]);
 useEffect(() => {

 fetch(book.location)
       .then(res => res.json())
       .then(
         (result) => {
           setMybook(result);
         },
         (error) => {

         }
       )
   },[]);
   const bookTOC = mybook.map((chapter) =>
<Nav defaultActiveKey="#" className="flex-column">
  <Nav.Link ><Link to={{ pathname:`${match.url}/${chapter.slug}`, state:{chapter}}}>
                                                                         {chapter.name}
                                                                         </Link></Nav.Link>
</Nav>);
  return  (<div>{mybook.length > 0 && bookTOC} </div>);
}
export default Book;