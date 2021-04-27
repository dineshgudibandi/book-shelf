import { Nav, Navbar, Form,FormControl,Button   } from 'react-bootstrap';
import {baseUrl} from './constants';
const NavBar = () => {
      return  (
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href={baseUrl}>Library</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href={`${baseUrl}/`}>Home</Nav.Link>
            <Nav.Link href={`${baseUrl}/`}>Books</Nav.Link>
            <Nav.Link href={`${baseUrl}/about`}>About</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>)
}
export default NavBar;