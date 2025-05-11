import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
    return (
        <Navbar bg="light" data-bs-theme="light">
        <Container className='d-flex flex-fill'>
            <Nav className='flex-fill justify-content-evenly'>
            <Navbar.Brand href="/">Pause&Purchase</Navbar.Brand>
            <Nav.Link href="/">Ladies</Nav.Link>
              <Nav.Link href="/men">Men's</Nav.Link>
              <Nav.Link href="/cart">My cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}
export default Navigation