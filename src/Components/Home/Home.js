import React, { useEffect, useState } from 'react';
import Product from './../Product/Product';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css';

function CustomInput(props) {
  return (
    <>
      <input
        type="radio"
        name={props.name}
        checked={props.isChecked === props.name}
        onChange={() => {
          props.setIsChecked(props.name);
        }}
      />
      {props.name}
    </>
  );
}

function filterByCategory(data, category) {
  let products = [];
  data.forEach((product) => {
    if (product.category === category) {
      products.push(product);
    }
  });
  return products;
}

function Home(props) {
  const [action, setAction] = useState('All');
  const [category, setCategory] = useState('Everything');
  const [productInfo, setProductInfo] = useState(props.data);

  useEffect(() => {
    if (action === 'All') {
      if (category === 'Everything') {
        setProductInfo(props.data);
      } else {
        const saleData = props.data.sale;
        const regularData = props.data.normal;
        setProductInfo({
          sale: filterByCategory(saleData, category),
          normal: filterByCategory(regularData, category),
        });
      }
    } else if (action === 'Sale') {
      if (category === 'Everything') {
        setProductInfo({ sale: props.data.sale, normal: null });
      } else {
        setProductInfo({
          sale: filterByCategory(props.data.sale, category),
          normal: null,
        });
      }
    } else if (action === 'Regular') {
      if (category === 'Everything') {
        setProductInfo({ normal: props.data.normal, sale: null });
      } else {
        setProductInfo({
          normal: filterByCategory(props.data.normal, category),
          sale: null,
        });
      }
    }
  }, [action, category, props.data]);

  const title = props.title;

  /*
    "Jackets", "Casual Shoes", "Flip Flops", "Tops", "Bracelet",
    "Trousers", "Shirts", "T-Shirts", "Socks", "Ring", "Earrings",
    "Watches", "Caps", "Sweatshirts", "Shorts"
  */

  return (
    <Container
      fluid
      style={{
        display: 'flex',
        flex:1,
        flexDirection: 'row',
        margin: 0,
        padding: 0,
        width: '100%',
      }}
    >
      {/* FILTER SECTION */}
      <Container
    
        style={{
          width: '15%',
          minWidth: '150px',
          backgroundColor: 'antiquewhite',
          position: 'sticky',
          top: 150,
          zIndex: 1,
          flex:1,
          // Use maxHeight plus overflowY for scrollable sidebar.
          maxHeight: '65vh',
          overflowY: 'auto',
          margin: 0,
          padding: '2rem',
        }}
      >
        <h4>Filters</h4>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Action type:</span>
          <div>
            <CustomInput name="All" isChecked={action} setIsChecked={setAction} />
          </div>
          <div>
            <CustomInput name="Sale" isChecked={action} setIsChecked={setAction} />
          </div>
          <div>
            <CustomInput
              name="Regular"
              isChecked={action}
              setIsChecked={setAction}
            />
          </div>

          <span style={{ marginTop: '1rem' }}>Product Type:</span>
          <div>
            <CustomInput
              name="Everything"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>
          <div>
            <CustomInput
              name="Jackets"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>
          <div>
            <CustomInput
              name="Casual Shoes"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>
          <div>
            <CustomInput
              name="Flip Flops"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>
          <div>
            <CustomInput
              name="Tops"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>
          <div>
            <CustomInput
              name="Bracelet"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>
          <div>
            <CustomInput
              name="Trousers"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>
          <div>
            <CustomInput
              name="Shirts"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>
    {   /*   <div>
            <CustomInput
              name="T-Shirts"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>}
          {/*<div>
            <CustomInput
              name="Socks"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>*/}
          <div>
            <CustomInput
              name="Ring"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>
          <div>
            <CustomInput
              name="Earrings"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>
          <div>
            <CustomInput
              name="Watches"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>
          <div>
            <CustomInput
              name="Caps"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>
          <div>
            <CustomInput
              name="Sweatshirts"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>
          <div>
            <CustomInput
              name="Shorts"
              isChecked={category}
              setIsChecked={setCategory}
            />
          </div>
        </div>
      </Container>

      {/* PRODUCT SECTION */}
      <Container
        fluid
        className="align-self-center"
        style={{
          width: '85%',
          margin: 0,
          padding: '1rem',
          zIndex: 2,
        }}
      >
        <b>
          <h1>{title}</h1>
        </b>

        {productInfo.sale !== null ? (
          <>
            <h2 style={{ color: 'red' }}>Sale</h2>
            <Row className="d-flex align-items-center">
              {productInfo.sale.map((product) => (
                <Col md={3} key={product.id}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </>
        ) : null}

        {productInfo.normal !== null ? (
          <>
            <h2 style={{ color: 'red' }}>Regular</h2>
            <Row className="d-flex align-items-center">
              {productInfo.normal.map((product) => (
                <Col md={3} key={product.id}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </>
        ) : null}
      </Container>
    </Container>
  );
}
 export default Home;