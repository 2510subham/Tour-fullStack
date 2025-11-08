import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/login.css"
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import registerimg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import { authContext } from '../context/authContext';
import { BASE_URL } from '../utils/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const [credentials, setcredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined
  })

  const { dispatch } = useContext(authContext);//we are using dispatch here to dispatch the action to auth context
  const navigate = useNavigate();
  const handlechange = (e) => {
    setcredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  };
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const result = await res.json();
      if (!res.ok) {
        return toast.error(result.message)
      }
      toast.success('Registered successfully')
      dispatch({ type: 'REGISTER_SUCCESS' })//we pass type :'..' this will goto auth context page and there it matches it with switch cases
      navigate('/login')
    } catch (err) {
      toast.error(err.message)
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
                <img src={registerimg} alt="loginimgs" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
                <Form onSubmit={handleClick} method='POST'>
                  <FormGroup>
                    <input type="text" placeholder="User Name" required id="username" onChange={handlechange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="email" placeholder="Email" required id="email" onChange={handlechange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder="Password" required id="password" onChange={handlechange} />
                  </FormGroup>
                  <Button className='btn secondary__btn auth__btn' type="submit">Create Account</Button>
                </Form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register

