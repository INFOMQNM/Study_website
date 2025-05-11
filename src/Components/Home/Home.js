import Product from './../Product/Product'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home(props) {

    const title= props.title
    const data = props.data

  return (
          <Container className='align-self-center'>
          <b><h1>{title}</h1></b>
            <h2 style={{color:"red"}}>Sale</h2>
        <Row>
        {
        data.sale.map((product) => (
          <Col md={3}><Product product={product} /></Col>
        ))
      }
          </Row>
          <h2 style={{color:"black"}}>Normal Catalogue</h2>
        <Row>
        {
        data.normal.map((product) => (
          <Col md={3}><Product product={product} /></Col>
        ))
      }
        </Row>
      </Container>
  
  );
}

export default Home;