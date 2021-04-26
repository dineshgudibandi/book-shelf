import {
  Switch,
  Route
} from "react-router-dom";
import About from './About';
import Books from './Books';
import Book from './Book';

const MainRouter = ()=>{
return  (<Switch>
                 <Route path="/about">
                   <About />
                 </Route>
                  <Route path={`/book/:bookId/:chapterId`}>
                 <Book />
                  </Route>
                <Route path={`/book/:bookId`}>
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