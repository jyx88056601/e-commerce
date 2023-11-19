/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import StoreContext from '../contexts/storeContext';
import { useSigninMutation } from '../hooks/usersHooks';
import { ApiError } from '../types/ApiErr';
import { getError } from '../utils';

const SignInPage = () => {
  // redirect page after signing in
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch } = useContext(StoreContext);
  const { userInfo } = state;
  const { mutateAsync: siginin, isPending } = useSigninMutation();
  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const data = await siginin({ email, password }); // sign in with email and password
      dispatch({ type: 'USER_SIGNIN', payload: data }); // update the global user info
      localStorage.setItem('userInfo', JSON.stringify(data)); // store to the local storage
      navigate(redirect); // redirect back to homepage
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    } // if it has already logged in
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(event) => setPassword(event.target.value)}
          ></Form.Control>
        </FormGroup>
        <Button disabled={isPending} type="submit">
          Sign In
        </Button>{' '}
        {isPending && <LoadingBox />}
        <div className="mb-3">
          New Customer? {''}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignInPage;
