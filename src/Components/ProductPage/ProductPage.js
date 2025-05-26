import React, { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CartContext } from "../../Context/CartContext";
import ModalComponent from "./Modal";
import productFinder from "./productFinder";
import settings from './../../settings.json';

function ProductPage(data) {
  let { gender, sale, id } = useParams();
  let product = productFinder(data.data, gender, sale, id);

  const [smShow, setSmShow] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  // Customize sustainability text based on category.
  const sustainabilityMessages = {
    Jackets: "This jacket was made using responsibly sourced materials.",
    "Casual Shoes": "These shoes were crafted with eco-friendly processes.",
    "Flip Flops": "These flip flops minimize plastic usage and waste.",
    Tops: "This top uses organic fabrics and energy-efficient production.",
    Bracelet: "This bracelet was made from recycled metals and jewels.",
    Trousers: "These trousers were made with low-water dyeing methods.",
    Shirts: "This shirt was created under fair labor and low-waste conditions.",
    "T-Shirts": "This T-shirt was made using carbon-neutral factories.",
    Socks: "These socks were made with minimal environmental impact.",
    Ring: "This ring was ethically sourced and handcrafted sustainably.",
    Earrings: "These earrings use responsibly mined materials.",
    Watches: "This watch was produced with reduced energy consumption.",
    Caps: "This cap was created under eco-friendly guidelines.",
    Sweatshirts: "This sweatshirt was made in a water-saving facility.",
    Shorts: "These shorts are dyed with biodegradable dyes.",
  };

  // Default message if no category match found:
  const defaultSustainabilityMessage =
    "This product was made using sustainable methods.";

  return (
    <Container>
      <ModalComponent
        smShow={smShow}
        setSmShow={setSmShow}
        settings={settings}
        logger={data.logger}
        cart={cart}
        setCart={setCart}
        product={product}
      />
      <Container>
        <Row>
          <h1>{product.name}</h1>
        </Row>
        <Row>
          <Col md={6}>
            <img
              src={"/" + product.image}
              width={500}
              height={500}
              alt={product.name}
            />
          </Col>
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <Row>
              {product.sale === true ? (
                <>
                  <h3>
                    Was: <del>${product.previous}</del>
                  </h3>
                  <h3>
                    NOW: <b>${product.price}</b>
                  </h3>
                </>
              ) : (
                <>
                  <h3>${product.price}</h3>
                </>
              )}
              <Button
                variant="outline-success"
                onClick={() => {
                  const updatedCart = [...cart, product];
                  if (settings.control) {
                    setCart(updatedCart);
                  }
                  setSmShow(true);
                }}
              >
                Add to cart
              </Button>
            </Row>
          </Col>
        </Row>
        {product.sustainable ? (
          <h5>
            {
              sustainabilityMessages[product.category] 
              || defaultSustainabilityMessage
            }
          </h5>
        ) : null}
      </Container>
    </Container>
  );
}

export default ProductPage;