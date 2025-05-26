import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
// Import your Questions Context
import { useQuestions } from '../../Context/QuestionContext';

function ModalComponent(props) {

  const { currentQuestion, getNextQuestion } = useQuestions();
  useEffect(() => {
      if (props.smShow == true) {
          props.logger.log(currentQuestion.text, "start");
      } 
},[props.smShow])
  const handleClose = () => {
      props.logger.log(currentQuestion.text, 'stop');
      getNextQuestion(); 
    props.setSmShow(false);
  };
  console.log(props.smShow)

  const handleAddToCart = () => {
    const updatedCart = [...props.cart, props.product];
    props.logger.log(props.product.name, 'buy');
    props.logger.log(currentQuestion.text, 'stop');
    props.setCart(updatedCart);
    getNextQuestion(); // Go to next question for next time
    props.setSmShow(false);
  };

  return (
    <Modal
      size="sm"
      show={props.smShow}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      {props.settings.control ? (
        // CONTROL == TRUE → Just show a simple "Item added" message
        <Modal.Header closeButton>
          <Modal.Title>Item added to cart</Modal.Title>
        </Modal.Header>
      ) : (
        // CONTROL == FALSE → Show the reflective question from context
        <Modal.Header closeButton>
          <Container>
            <Row>
              {currentQuestion ? currentQuestion.text : 'No question found'}
            </Row>
              <Row style={{ justifyContent: 'center', marginTop: '1rem' }}>
              <Col>
                <Button variant="outline-danger" onClick={handleClose}>
                  No, don't add item to cart
                </Button>
                </Col>
                <Col>
                <Button variant="outline-success" onClick={handleAddToCart}>
                Yes, add item to cart
                </Button>
                </Col>

            </Row>
          </Container>
        </Modal.Header>
      )}
    </Modal>
  );
}

export default ModalComponent;