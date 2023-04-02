import React from 'react'
import "../styles/home.css"
import { Container,Row,Col } from 'reactstrap'
import heroImg from "../assets/images/hero-img01.jpg"
import heroImg02 from "../assets/images/hero-img02.jpg"
import heroVideo from "../assets/images/hero-video.mp4"
import worldImg from "../assets/images/world.png"
import Subtitle from '../Shared/Subtitle'
import Searchbar from '../Shared/Searchbar'
import Servicelist from '../services/Servicelist'
import FeaturedTourList from '../components/featured-tour/FeaturedTourList';
import experienceImg from "../assets/images/experience.png" 
import MasonaryImagesGallery from '../components/image-gallery/MasonaryImagesGallery'
import Testimonial from '../components/Testimonial/Testimonial'
import NewsLetter from '../Shared/NewsLetter'
const Home = () => {
  return (
    <>
    <section>
    <Container>
      <Row>
        <Col lg='6'>
          <div className="hero__content">
            <div className="hero__subtitle d-flex align-items-center">
              <Subtitle subtitle={'Know Before You Go'}/>
              <img src={worldImg} alt="worlds" />
            </div>
            <h1>Travelling opens the doors to creating <span className="highlight">memories</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, adipisci perferendis eum, aperiam deleniti inventore modi natus magnam officia laborum nobis tenetur qui distinctio excepturi tempora enim ad reiciendis quam.</p>
          </div>
        </Col>

        <Col lg='2'>
            <div className="hero__img-box">
              <img src={heroImg} alt="hero" />
            </div>
        </Col>
        <Col lg='2'>
            <div className="hero__img-box hero__video-box mt-4">
              <video src={heroVideo} alt="hero" controls />
            </div>
        </Col>
        <Col lg='2'>
            <div className="hero__img-box mt-5">
              <img src={heroImg02} alt="hero" />
            </div>
        </Col>
        <Searchbar/>
      </Row>
    </Container>
    </section>
                                   {/* home section start */}
    <section id="about">
      <Container>
        <Row>
          <Col ls='3'>
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">we offer our best services</h2>
          </Col>
          <Servicelist/>
        </Row>
      </Container>
    </section>
    {/* ================================  featured tour section start*/}
    <section>
      <Container>
        <Row>
          <Col lg='12' className='mb-5'>
              <Subtitle subtitle={'Explore'}/>
              <h2 className="featured__tour-title ">Our featured tours</h2>
          </Col>
          <FeaturedTourList/>
        </Row>
      </Container>
    </section>
    {/*  Expreience section start*/ }
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
      {/*  gallery sction start*/}
      <section id="#gallary">
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Gallery'}/>
              <h2 className="gallery__title">
                Visit our customer tour gallery
                  </h2>
            </Col>
            <Col lg=' 12'>
              <MasonaryImagesGallery/>
            </Col>  
          </Row>
        </Container>
      </section>
    {/*testimonial section start */}
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
       {/*testimonial section end */}
       <NewsLetter/>
    </>
  )
}

export default Home