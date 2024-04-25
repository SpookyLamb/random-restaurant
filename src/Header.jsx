import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary border">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mx-auto">
            <Navbar.Brand className="rubik-mono" href="#home">THE SUMMER DEMON</Navbar.Brand>
            <Nav.Link className="rubik-mono" href="#link">Home</Nav.Link>
            <Nav.Link className="rubik-mono" href="#link">About</Nav.Link>
            <Nav.Link className="rubik-mono" href="#link">Menu</Nav.Link>
            <Nav.Link className="rubik-mono" href="#link">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header