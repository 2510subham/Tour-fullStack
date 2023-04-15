import React,{useState,useContext} from 'react'
import "../styles/login.css"
import {Container,Row,Col,Form,FormGroup,Button} from 'reactstrap';
import { Link,useNavigate } from 'react-router-dom';
import loginimg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { authContext } from '../context/authContext';
import { BASE_URL } from '../utils/Config';


const Login = () => {
  const [credentials, setcredentials] = useState({
   email:undefined,
   password:undefined
  })

  const {dispatch} = useContext(authContext);//we are using dispatch here to dispatch the action to auth context
  const navigate=useNavigate();


  const handlechange=(e)=>{
    setcredentials(prev=>({...prev,[e.target.id]:e.target.value}))
  };
  const handleClick=async (e)=>{
    e.preventDefault();
    dispatch({type:'LOGIN_START'});
    try{
      const res=await fetch(`${BASE_URL}/auth/login`,{
        method:'post',
        headers:{
          'content-type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(credentials)
      })
      const result=await res.json();
      console.log(result.data);
      if(!res.ok)
      {
        alert(result.message)
        navigate('/login')
        return dispatch({type:'LOGIN_FAILURE',payload:result.message})
      }
      dispatch({type:'LOGIN_SUCCESS',payload:result.data})
      navigate('/')

    }catch(err)
    {
      dispatch({type:'LOGIN_FAILURE',payload:err.message})
    }

  }
  return (
    <section>
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
      </Container>
    </section>
  )
}

export default Login

