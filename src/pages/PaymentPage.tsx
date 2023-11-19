import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import StoreContext from '../contexts/storeContext';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(StoreContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Paypal');
  useEffect(() => {
    if (!state.cart.shippingAddress) {
      navigate('/shipping');
    }
  });

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch({
      type: 'SAVE_PAYMENT_METHOD',
      payload: selectedPaymentMethod,
    });

    localStorage.setItem('paymentMethod', selectedPaymentMethod);
    navigate('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Paypal"
              label="Paypal"
              value="Paypal"
              checked={selectedPaymentMethod === 'Paypal'}
              onChange={(event) => setSelectedPaymentMethod(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={selectedPaymentMethod === 'Stripe'}
              onChange={(event) => setSelectedPaymentMethod(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button
              type="submit"
              onClick={() => {
                navigate('/placeorder');
              }}
            >
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentPage;
