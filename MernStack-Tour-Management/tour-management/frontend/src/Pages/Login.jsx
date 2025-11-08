import React, { useState, useContext } from 'react'
import "../styles/login.css"
import "../styles/tour.css"
import { Container, Row, Col, Form, FormGroup, Button, Spinner } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import loginimg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { authContext } from '../context/authContext';
import { BASE_URL } from '../utils/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [credentials, setcredentials] = useState({
    email: undefined,
    password: undefined
  })

  const { dispatch } = useContext(authContext);//we are using dispatch here to dispatch the action to auth context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handlechange = (e) => {
    setcredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  };
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true)
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      })
      const result = await res.json();
      console.log(result.data);
      if (!res.ok) {
        toast.error(result.message)
        navigate('/login')
        setLoading(false)
        return dispatch({ type: 'LOGIN_FAILURE', payload: result.message })
      }
      toast.success('Logged in successfully')
      setLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS', payload: result.data })
      navigate('/')
    } catch (err) {
      setLoading(false)
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message })
    }

  }
  return (
    <section>
      <ToastContainer closeButton closeOnClick position='bottom-right' />
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginimg} alt="loginimgs" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={handleClick} method='POST'>
                  <FormGroup>
                    <input type="email" placeholder="Email" required id="email" onChange={handlechange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder="Password" required id="password" onChange={handlechange} />
                  </FormGroup>
                  <Button className='btn secondary__btn auth__btn' type="submit">Login</Button>
                </Form>
                <p>Don't have an account? <Link to="/register">Create</Link></p>
              </div>
            </div>
          </Col>
        </Row>
        {loading ? <Spinner

          className="spin-container"
          color="primary"
        >
          Loading...
        </Spinner> : null}
      </Container>
    </section>
  )
}

export default Login

