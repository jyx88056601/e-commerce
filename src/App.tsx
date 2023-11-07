import sampleProducts from './data';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Brand Name</Navbar.Brand>
        </Container>
        <Nav>
          <a href="/cart" className="nav-link">
            Cart
          </a>
          <a href="/signin" className="nav-link">
            Sign in
          </a>
        </Nav>
      </Navbar>

      <header>X Store</header>
      <main>
        <Container className="mt-3">
          <Row>
            {sampleProducts.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3}>
                <img
                  alt={product.name}
                  src={product.image}
                  className="product-image"
                ></img>
                <h2>{product.name}</h2>
                <p>${product.price}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
      <div className="text-center">
        <footer>All right reserved</footer>
      </div>
    </div>
  );
}

export default App;
