import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../Security/AuthContext';
// import { AuthContext } from '../Security/AuthContext';
// import { useContext } from 'react';

function CollapsibleExample() {
    const authContext = useAuth();
    const isAuth = authContext.isAuthenticated;

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">TODO LIST</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          {isAuth && <Nav.Link href="/todos">Todos</Nav.Link>}
          </Nav>
          <Nav>
           {!isAuth && <Nav.Link href="/login">Login</Nav.Link>}
             {isAuth && <Nav.Link eventKey={2} href="/logout">
              Logout
            </Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;