import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import About from './About';
import Home from './Home';
import Books from './Books';
import Book from './Book';

const MainRouter = ()=>{
return  (<Switch>
                 <Route path="/about">
                   <About />
                 </Route>
                <Route path={`/books/:bookId`}>
                 <Book />
                  </Route>
                 <Route path="/books">
                   <Books />
                 </Route>
                  <Route path="/">
                   <Books />
                  </Route>
               </Switch>);
               }
export default MainRouter;