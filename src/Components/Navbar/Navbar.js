import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
function Navigation() {
  const { cart, setCart } = useContext(CartContext);
  let total = 0
  cart.forEach(item => {
      total += item.price
    });

    return (
        <Navbar bg="light" data-bs-theme="light"  sticky="top" >
        <Container className='d-flex flex-fill'>
            <Nav className='flex-fill justify-content-evenly'>
            <Navbar.Brand href="/">Pause&Purchase</Navbar.Brand>
            <Nav.Link href="/">Ladies</Nav.Link>
              <Nav.Link href="/men">Men's</Nav.Link>
            <Nav.Link href="/cart">My cart <b>${ total}</b></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}
export default Navigation