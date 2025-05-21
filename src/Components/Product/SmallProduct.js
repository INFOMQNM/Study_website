import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function SmallProduct({ product, onRemove }) {
  return (
    <Container 
      style={{ 
        backgroundColor: 'grey', 
        margin: 10, 
        padding: 10, 
        borderRadius: 10 
      }}
    >
      <Row className="d-flex align-items-center">
        <Col>
          <img 
            src={product.image} 
            width={50} 
            height={50} 
            alt={product.name} 
          />
        </Col>
        <Col>
          <p style={{ color: 'white', textAlign: 'center', margin: 0 }}>
            {product.name}
          </p>
        </Col>
        <Col>
          <p style={{ color: 'white', textAlign: 'center', margin: 0 }}>
            ${product.price * product.quantity}
          </p>
        </Col>
        {product.quantity && (
          <Col>
            <p style={{ color: 'white', textAlign: 'center', margin: 0 }}>
              Qty: {product.quantity}
            </p>
          </Col>
        )}
        <Col className="text-center">
          <Button 
            variant="outline-danger" 
            onClick={() => onRemove(product.id)}
          >
            Remove
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SmallProduct;