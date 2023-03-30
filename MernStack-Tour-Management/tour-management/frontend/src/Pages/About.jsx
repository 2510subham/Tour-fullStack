import React from 'react';
import { Container,Row,Col } from 'reactstrap';
import Subtitle from '../Shared/Subtitle';
import experienceImg from "../assets/images/experience.png" 
import Testimonial from '../components/Testimonial/Testimonial';
import "../styles/home.css";
const About = () => {
  return (
    <>
    <section>
      <Container>
      <Row>
        <Col lg='6'>
          <div className="experience__content">
            <Subtitle subtitle={'Experience'}/>
            <h2>
              With our all experience <br/> we will serve you the best
            </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, quaerat!
              <br />
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, quisquam.
            </p>
          </div>
          <div className="counter__wrapper d-flex align-items-center gap-5">
            <div className="counter__box">
              <span>12k+</span>
              <h6>Successful Trips</h6>
            </div>
            <div className="counter__box">
              <span>2k+</span>
              <h6>Regular clients</h6>
            </div>
            <div className="counter__box">
              <span>15</span>
              <h6>
                Years experience
              </h6>
            </div>
          </div>
        </Col>
        <Col lg='6'>
          <div className="experience__img">
            <img src={experienceImg} alt="imgs" />
          </div>
        </Col>
      </Row>
      </Container>
    </section>

    {/*  *****/ }
    <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Fans Love'}/>
              <h2 className='testimonial__title'> What our fans says about us</h2>
            </Col>
            <Col lg='12'>
              <Testimonial/>
            </Col>
          </Row>
        </Container>
      </section>
      
    </>
  )
}

export default About