
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useQuestions } from '../../Context/QuestionContext';
function Endpage(props) {
    const navigate = useNavigate();
    const { resetQuestions } = useQuestions();
    /*
    This is the end page. It is the page that the user will see after they have purchased the product.        onClick={() => {
          // Example usage of your logger
          props.logger.log('/end', 'stop');
          props.logger.exportLogs();
          props.logger.clearLogs();
          resetQuestions();
          // Clear out local storage cart if needed
          localStorage.removeItem('cart');

          // Navigate away
          navigate('/');
        }}
    */
    return (
          
            <Container style={{width:'100%', alignSelf:'center'}}>
                <Row style={{marginTop:'100px'}}>
                 
                        <h1 style={{textAlign:'center'}}>Thank you for your purchase</h1>
                        <Button
        variant="outline-success"
        onClick={() => {
            // Example usage of your logger
            props.logger.log('/end', 'stop');
            props.logger.exportLogs();
            props.logger.clearLogs();
            resetQuestions();
            // Clear out local storage cart if needed
            localStorage.removeItem('cart');
  
            // Navigate away
            navigate('/');
          }}
                >
                    Proceed to next phase
      </Button>
                </Row>
            </Container>
       
    )
}

export default Endpage;