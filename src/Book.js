import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import {
  useLocation,
  useRouteMatch,
  Link,
  useParams,
} from "react-router-dom";
import { Nav } from 'react-bootstrap';

const Book = () => {
  const params = useParams();
  console.log(params);
  const location = useLocation()
  const book = location.state?.book;
  const chapter = location.state?.chapter;
  const [currentChapter,setCurrentChapter] = useState([]);
  let match = useRouteMatch();
   const [mybook,setMybook] = useState([]);
 useEffect(() => {
  if(book){
     fetch(book.location)
       .then(res => res.json())
       .then(
         (result) => {
           setMybook(result);
               fetch(result[0].location)
                            .then(res => res.json())
                            .then(
                              (result) => {
                                setCurrentChapter(result);
                              },
                              (error) => {

                              }
                            )
         },
         (error) => {

         }
       )
       }
   },[]);
    useEffect(() => {
             if(chapter){  fetch(chapter.location)
                 .then(res => res.json())
                 .then(
                   (result) => {
                     setCurrentChapter(result);
                   },
                   (error) => {

                   }
                 )
                 }
      },[chapter]);
   const bookTOC = mybook.map((chapter) =>
<Nav defaultActiveKey="#" className="flex-column" key={chapter.slug} >
  <Link to={{ pathname:`/book/${book.slug}/${chapter.slug}`, state:{chapter,book}}}>
                                                                         {chapter.name}
                                                                         </Link>
</Nav>);
  return  (<div className="row"><div className="col-xl-2">{mybook.length > 0 && bookTOC}</div><div className="col-xl-8">{ currentChapter && <div><span> Author: {currentChapter.authors}</span><p><div dangerouslySetInnerHTML={{__html: currentChapter.content}} /></p></div> } </div></div>);
}
export default Book;