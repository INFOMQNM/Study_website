import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
function SmallProduct(product) {
    product = product.product
    return (
        <Container style={{backgroundColor:'grey', margin:10, padding:10, borderRadius:10}}>
            <Row className='d-flex'>
                <Col >
                    <img src={product.image} width={50} height={50} />                
                </Col>
                <Col className="flex" style={{flex: 1, alignContent: 'center'}}>
                    <p style={{color:'white', textAlign:'center'}}>{product.name}</p>
                </Col>
                <Col style={{alignContent: 'center'}}>
                    <p style={{color:'white', textAlign:'center'}}>${product.price}</p>
                </Col>
            </Row>
        </Container>
    )
}
export default SmallProduct;