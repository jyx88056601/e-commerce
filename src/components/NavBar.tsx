import { Badge, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import StoreContext from '../contexts/storeContext';
import { useContext } from 'react';

const NavBar = () => {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(StoreContext);

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' });
  };

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('apymentMethod');
    window.location.href = '/signin';
  };

  return (
    <Navbar
      className="d-flex flex-column align-items-stretch p-2 pb-0 mb-3"
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <LinkContainer to="/">
        <Navbar.Brand>Shop Name</Navbar.Brand>
      </LinkContainer>
      <div className="d-flex justify-content-between align-items-center">
        <Navbar.Collapse>
          <Nav className="w-100 justify-content-end">
            <Link /* theme switcher*/
              to="#"
              className="nav-link header-link"
              onClick={switchModeHandler}
            >
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Link>

            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && ( // shopping cart badge
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown
                className="header-link"
                title={`Hello, ${userInfo.name}`}
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  {' '}
                  Sign Out{' '}
                </Link>
              </NavDropdown>
            ) : (
              <NavDropdown className="header-link" title={`Hello, sign in`}>
                <LinkContainer to="/signin">
                  <NavDropdown.Item>Sign In</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
