import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Product.css';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/esm/Container';

function Product(product) {
  product = product.product;
  const navigate = useNavigate();

  return (
    <Card
      style={{
        width: '18rem',
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        position: 'relative'
      }}
      id={product.id}
    >
      {product.sustainable ? (
        <Container style={{ position: 'absolute', zIndex: 1, top: 35 }}>
          <img src={'./sustainable.png'} width={50} height={50} alt="Sustainable" />
        </Container>
      ) : null}

      <Card.Img
        variant="top"
        width={300}
        height={300}
        src={product.image}
      />
      <Card.Body style={{ alignSelf: 'center', width: "80%" }}>
        <Row className="gapSpace">
          <Col md={product.sale === true ? 8 : 12}>
            {/* Truncate the text to one line with an ellipsis. */}
            <Card.Title
              style={{
                textAlign: 'left',
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product.name}
            </Card.Title>
          </Col>
          {product.sale === true ? (
            <Col md={4}>
              <Button variant="outline-danger" disabled>
                -{Math.round(Number((1 - (product.price / product.previous)).toPrecision(1) * 100))}%
              </Button>
            </Col>
          ) : null}
        </Row>
        <Row className="gapSpace">
          <Card.Text>
            {product.sale === true ? (
              <>
                <del>${product.previous}</del>
                <b> NOW ${product.price}</b>
              </>
            ) : (
              <b>${product.price}</b>
            )}
          </Card.Text>
        </Row>
        <Row className="gapSpace">
          <Button
            variant="primary"
            onClick={() => {
              navigate('/product/' + product.gender + "/" + product.sale + "/" + product.id);
            }}
          >
            See more
          </Button>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Product;