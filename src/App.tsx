import { HStack } from '@chakra-ui/react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import ThemeModeSwitch from './components/ThemeModeSwitch';
function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Brand Name</Navbar.Brand>
        </Container>
        <Nav>
          <HStack>
            <a href="/cart" className="nav-link">
              Cart
            </a>
            <a href="/signin" className="nav-link">
              Sign in
            </a>
            <ThemeModeSwitch></ThemeModeSwitch>
          </HStack>
        </Nav>
      </Navbar>

      <header>X Store</header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <div className="text-center">
        <footer>All right reserved</footer>
      </div>
    </div>
  );
}

export default App;
