import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import StoreContext from '../contexts/storeContext';
const ShippingPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(StoreContext);
  const userInfo = state.userInfo;
  const shippingAdress = state.cart.shippingAddress;
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  const [fullName, setFullName] = useState(shippingAdress.fullName || '');
  const [address, setAddress] = useState(shippingAdress.address || '');
  const [city, setCity] = useState(shippingAdress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAdress.postalCode || '');
  const [country, setCountry] = useState(shippingAdress.postalCode || '');

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate('/payment');
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              required
            />
          </Form.Group>
        </Form>

        <div className="mb-3">
          <Button
            variant="primary"
            type="submit"
            onClick={() => navigate('/payment')}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
