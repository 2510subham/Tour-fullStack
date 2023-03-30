import React,{useState} from 'react'
import "../styles/login.css"
import {Container,Row,Col,Form,FormGroup,Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import registerimg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

const Register = () => {
  const [credentials, setcredentials] = useState({
    username:undefined,
   email:undefined,
   password:undefined
  })
  const handlechange=(e)=>{
    setcredentials(prev=>({...prev,[e.target.id]:e.target.value}))
  };
  const handleClick=(e)=>{
    e.preventDefault();

  }
  return (
    <section>
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
                <Form onSubmit={handleClick}>
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

