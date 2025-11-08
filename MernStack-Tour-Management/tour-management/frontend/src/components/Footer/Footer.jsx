import React from 'react'
import "./footer.css"
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from "../../assets/images/logo.png";

const quick_links = [
  {
    path: "/",
    display: "Home"
  },
  {
    path: "/about",
    display: "About"
  },
  {
    path: "/tours",
    display: "Tours"
  }
]

const quick_links2 = [
  {
    path: "/gallery",
    display: "Gallery"
  },
  {
    path: "/login",
    display: "Login"
  },
  {
    path: "/register",
    display: "Register"
  }
]

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='3'>
            <div className="logo">
              <img src={logo} alt="logo" style={{ width: '200px', height: '100px' }} />
              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to="#"><i class="ri-youtube-line"></i></Link>
                </span>
                <span>
                  <Link to="#"><i class="ri-github-line"></i></Link>
                </span>
                <span>
                  <Link to="#"><i class="ri-facebook-line"></i></Link>
                </span>
                <span>
                  <Link to="#"><i class="ri-instagram-line"></i></Link>
                </span>
              </div>
            </div>

          </Col>
          <Col lg='3'>
            <h5 className="footer__links-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              {
                quick_links.map((links, index) => (
                  <ListGroupItem key={index} className="ps-0 border-0">
                    <Link to={links.path}>{links.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
          <Col lg='3'>
            <h5 className="footer__links-title">Quick Links</h5>
            <ListGroup className="footer__quick-links">
              {
                quick_links2.map((links, index) => (
                  <ListGroupItem key={index} className="ps-0 border-0">
                    <Link to={links.path}>{links.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Contact</h5>
            <ListGroup className="footer__quick-links">

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span>
                    <i class="ri-map-pin-line"></i>
                    Address:
                  </span>

                </h6>
                <p className='mb-0'>Howrah,India</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span>
                    <i class="ri-mail-line"></i>
                    Email:
                  </span>

                </h6>
                <p className='mb-0'>subhamagarwal400@gmail.com</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span>
                    <i class="ri-phone-line"></i>
                    Phone:
                  </span>

                </h6>
                <p className='mb-0'>9433214282</p>
              </ListGroupItem>

            </ListGroup>
          </Col>
          <Col lg='12' className='text-center pt-5'>
            <p className="copyright">Copyright &copy; {year},design and devolop by Subham Agarwal .All rights reversed</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer