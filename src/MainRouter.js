import {
  Switch,
  Route
} from "react-router-dom";
import About from './About';
import Books from './Books';
import Book from './Book';
import { baseUrl } from './constants';
const MainRouter = ()=>{
return  (<Switch>
                 <Route path={`${baseUrl}/about`}>
                   <About />
                 </Route>
                  <Route path={`${baseUrl}/book/:bookId/:chapterId`}>
                 <Book />
                  </Route>
                <Route path={`${baseUrl}/book/:bookId`}>
                 <Book />
                  </Route>
                 <Route path={`${baseUrl}/books`}>
                   <Books />
                 </Route>
                 <Route path={baseUrl}>
                  <Books />
                    </Route>
                  <Route path="/">
                   <Books />
                  </Route>
               </Switch>);
               }
export default MainRouter;