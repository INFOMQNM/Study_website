import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Product.css'
import { useNavigate } from "react-router-dom";
function Product(product) {
  product = product.product
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem', marginTop: 10, marginBottom: 10, flex:1,  }} id={product.id}>
      <Card.Img variant="top" width={300} height={300} src={product.image} />
      <Card.Body style={{ alignSelf: 'center', width:"80%",}}>
        <Row className='gapSpace'>
          <Col md={product.sale == true ? 8 : 12}>
            <Card.Title style={{textAlign:'left'}}>{product.name}</Card.Title>
          </Col>
          {
            product.sale == true ?
              (<Col md={4}>
                <Button variant="outline-danger" disabled>-{Number((1-(product.price/product.previous)).toPrecision(1)*100)}%</Button>
              </Col>)
                :
              (<></>)
          }
        </Row>
        <Row className='gapSpace'>
        <Card.Text>{
          product.sale == true ? 
            (<><del>${product.previous}</del><b> NOW ${product.price}</b></>) :
            (<b>${product.price}</b>)
        }
        </Card.Text>
        </Row>
        <Row className='gapSpace'>
        <Button variant="primary" onClick={() => {
          navigate('/product/'+product.gender+"/"+product.sale+"/"+product.id)
        }}>See more</Button>
        </Row>

      </Card.Body>
    </Card>
  )
}
export default Product;