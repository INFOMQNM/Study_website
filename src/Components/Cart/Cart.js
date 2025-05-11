import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import SmallProduct from './../Product/SmallProduct'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
function CartPage(props) {
    const navigate = useNavigate();

    const { cart, setCart } = useContext(CartContext);
    let total = 0;

    cart.forEach(product => {
        total = total + product.price;
    });
    return (
        <Container style={{width:"100%", alignContent:'center'}}>
            <b><h1>My Cart</h1></b>
            <Row className="justify-content-center">
        {
        cart.map((product) => (
                <div style={{width:"80%"}}>
                 <SmallProduct product={product} />
                </div>
               
        ))
      }
          </Row>
            <h2>Total cost: ${total}</h2>
            <Button variant="outline-success" onClick={() => {
                props.logger.log('/cart', "stop");
                props.logger.exportLogs();
                props.logger.clearLogs();
                localStorage.removeItem("cart");
                navigate('/')
            }}>
                Proceed to checkout
            </Button>
        </Container>
    )
}
export default CartPage