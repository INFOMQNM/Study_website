import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { useQuestions } from '../../Context/QuestionContext';
// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

// Local components
import SmallProduct from './../Product/SmallProduct';

function CartPage(props) {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const { resetQuestions } = useQuestions();
  /**
   * Convert the cart array into a unique list of items,
   * grouping duplicates under a single item with 'quantity'.
   */
  const cartItems = useMemo(() => {
    const map = new Map();
    cart.forEach((item) => {
      if (map.has(item.id)) {
        const existingItem = map.get(item.id);
        existingItem.quantity += 1;
        map.set(item.id, existingItem);
      } else {
        map.set(item.id, { ...item, quantity: 1 });
      }
    });
    return Array.from(map.values());
  }, [cart]);

  /**
   * Remove all instances of a specific product from the cart.
   * (If you want to decrement just one item at a time, you can
   * adjust this function to handle quantity changes instead.)
   */
  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter((c) => c.id !== itemId);
    setCart(updatedCart);
  };

  /**
   * Calculate total cost by summing (price * quantity) 
   * for each unique item in the cart.
   */
  const total = cartItems.reduce((acc, product) => (
    acc + product.price * product.quantity
  ), 0);

  return (
    <Container style={{ width: '100%', alignContent: 'center' }}>
      <h1 style={{ fontWeight: 'bold' }}>My Cart</h1>
      <Row className="justify-content-center">
        {cartItems.map((product) => (
          <div key={product.id} style={{ width: '80%' }}>
            <SmallProduct
              product={product}
              onRemove={handleRemoveItem}
            />
          </div>
        ))}
      </Row>
      <h2>Total cost: ${total}</h2>
      <Button
        variant="outline-success"
        onClick={() => {
          // Example usage of your logger
          props.logger.log('/cart', 'stop');
          props.logger.exportLogs();
          props.logger.clearLogs();
          resetQuestions();
          // Clear out local storage cart if needed
          localStorage.removeItem('cart');

          // Navigate away
          navigate('/');
        }}
      >
        Proceed to checkout
      </Button>
    </Container>
  );
}

export default CartPage;