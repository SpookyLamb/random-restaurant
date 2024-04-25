import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar expand="lg" className="border">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-danger'/>
        <Navbar.Collapse>
          <Nav className="mx-auto">
            <Navbar.Brand className="rubik-mono navlink" href="#home">| THE SUMMER DEMON |</Navbar.Brand>
            <Nav.Link className="rubik-mono navlink" href="#link">Home</Nav.Link>
            <Nav.Link className="rubik-mono navlink" href="#link">About</Nav.Link>
            <Nav.Link className="rubik-mono navlink" href="#link">Menu</Nav.Link>
            <Nav.Link className="rubik-mono navlink" href="#link">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header