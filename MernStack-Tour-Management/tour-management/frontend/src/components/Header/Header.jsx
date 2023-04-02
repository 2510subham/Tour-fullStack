import React,{useRef,useEffect,useContext} from 'react'
import { NavLink,Link,useNavigate } from 'react-router-dom';
import {Container,Row,Button} from 'reactstrap'
import logo from "../../assets/images/logo.png"
import "./header.css"
import {authContext} from '../../context/authContext.js';
const nav_links=[
  {
    path:"/",
    display:"Home" 
  },
  {
    path:"/about",
    display:"About" 
  },
  {
    path:"/tours",
    display:"Tours" 
  }
]

const Header = () => {
  const headerref=useRef(null);
  const navigate=useNavigate();
  const {user,dispatch}=useContext(authContext);

  const logout=()=>{
    dispatch({type:"LOGOUT"})
    navigate('/login')
  }

  const stickyheaderfunc=()=>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
        headerref.current.classList.add('sticky__header')
      }
      else
      {
        headerref.current.classList.remove('sticky__header')
      }
    })
  }
  useEffect(()=>{
    stickyheaderfunc();
    return window.removeEventListener('scroll',stickyheaderfunc)
  },[])
  return (
    <header className="header" ref={headerref}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
              {/* Logo */}

              <div className="logo">
                <img src={logo} alt="logo" className='imagewidth'/>
              </div>
              {/*LOGO end */}
              {/*menu start */}
                <div className="navigation">
                  <ul className="menu d-flex align-items-center gap-5">
                    {
                      nav_links.map((links,index)=>(
                        <li className="nav__item" key={index}>
                          <NavLink to={links.path} className={navClass=>navClass.isActive?'active__link':""}>{links.display}</NavLink>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              {/*menu end */}

              <div className="nav__right d-flex align-items-center gap-4">
                    <div className="nav__btns d-flex align-items-center gap-4">
                      {
                        //after login we get one object from that object we extracted username of user
                        user?(
                        <>
                          <h5 className='mb-0'>{user.username}</h5>
                          <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                        </>
                        ):(
                          <>
                          <Button className="btn secondary__btn"><Link to="/login">Login</Link></Button>
                          <Button className="btn primary__btn"><Link to="/register">Register</Link></Button>
                          </>
                        )
                      }
                    </div>
                    <span className='mobile__menu'>
                        <i class="ri-menu-line"></i>
                    </span>
              </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header