import {
  useParams
} from "react-router-dom";
const Book = () => {
  let { bookId } = useParams();
  return <h3>Requested Book ID: {bookId}</h3>;
}
export default Book;