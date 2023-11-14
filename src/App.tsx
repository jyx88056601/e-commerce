import { HStack, Text, Link } from '@chakra-ui/react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import ThemeModeSwitch from './components/ThemeModeSwitch';
function App() {
  return (
    <div className="d-flex flex-column vh-100">
      {/* <Navbar bg="dark" variant="dark" expand="lg">
        <HStack>
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
        </HStack>
      </Navbar> */}

      <HStack padding="10px" bg="black" justifyContent="space-between">
        <Text color="white" fontSize="large">
          Brand Name
        </Text>
        <Link href="/cart" color="white">
          Cart
        </Link>
        <Link href="/cart" color="white">
          Sign in
        </Link>
        <ThemeModeSwitch></ThemeModeSwitch>
      </HStack>

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
