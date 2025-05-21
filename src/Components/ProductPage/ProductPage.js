import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useContext,useEffect } from "react";
import Col from 'react-bootstrap/Col';
import { CartContext } from "../../Context/CartContext";
import React, { useState } from "react";
import ModalComponent from "./Modal";
import productFinder from "./productFinder";
import settings from './../../settings.json';
function ProductPage(data) {
    let { gender, sale, id } = useParams();
    let product = productFinder(data.data, gender, sale, id);
    const [smShow, setSmShow] = useState(false);
    const { cart, setCart } = useContext(CartContext);

    return (
        <Container>
            <ModalComponent smShow={smShow} setSmShow={setSmShow} settings={settings} logger={data.logger}  cart={cart} setCart={ setCart} product={product} />
            <Container>
                <Row>
                    <h1>{product.name}</h1>
                </Row>
                <Row>
                    <Col md={6}>
                        <img src={"/"+product.image} width={500} height={500} />
                    </Col>
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        <Row>
                            {
                                product.sale == true ? 
                                    (<>
                                        <h3>Was: <del>${product.previous}</del></h3>           
                                        <h3>NOW: <b>${product.price}</b></h3>     
                                    </>) :
                                    (<>
                                        <h3>${product.price}</h3>
                                    </>)
                            }
                            <Button variant="outline-success" onClick={() => {
                                const updatedCart = [...cart, product];
                                if (settings.control == true) {
                                    setCart(updatedCart);
                                }
                                        
                                        setSmShow(true)
                            }}>
                                Add to cart
                            </Button>
                       </Row>   
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default ProductPage;