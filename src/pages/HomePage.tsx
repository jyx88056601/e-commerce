import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import sampleProducts from '../data';

const HomePage = () => {
  return (
    <Row>
      {sampleProducts.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <Link to={'/product/' + product.slug}>
            <img
              alt={product.name}
              src={product.image}
              className="product-image"
            ></img>
            <h2>{product.name}</h2>
          </Link>
          <p>${product.price}</p>
        </Col>
      ))}
    </Row>
  );
};

export default HomePage;
