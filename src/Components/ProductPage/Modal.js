import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
function ModalComponent(props) {
    const questions = [
        "Do you really need this item?",
        "Does this item fit in your budget?",
        "Will you wear this item more than 10 times?"
    ]
    const randomIndex = Math.floor(Math.random() * questions.length );
    return (
    <Modal
        size="sm"
        show={props.smShow}
            onHide={() => {
                props.logger.log("reflective_question", 'stop')
                props.setSmShow(false)
            }}
        aria-labelledby="example-modal-sizes-title-sm"
        >{
                props.settings.control == true ?
                    (
                        <Modal.Header closeButton>
                            Item added to cart
                        </Modal.Header>
                    ) :
                    (
                        <Modal.Header closeButton>
                            <Container>
                            <Row>
                            {questions[randomIndex]}
                            </Row>
                                <Row style={{justifyContent:'center'}}>
                                    
                                    <Button variant="outline-success" onClick={() => {
                                        const updatedCart = [...props.cart, props.product];
                                        props.setCart(updatedCart)
                                        props.setSmShow(false);
                            }}>Yes</Button>
                            </Row>
                            </Container>
 
                        </Modal.Header>       
                    )
    }


    </Modal>)
}
export default ModalComponent