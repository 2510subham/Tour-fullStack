import React from 'react'
import "./newsletter.css"
import { Container,Row,Col } from 'reactstrap'
import maleTourist from "../assets/images/male-tourist.png"
import {Form,Button} from 'reactstrap';
import {BASE_URL} from '../utils/Config';

const NewsLetter = () => {
    const handlesubmit = (e) => {
        e.preventDefault();

        console.log('Submited');
    }
    
  return (
    <section className='newsletter'>
        <Container>
            <Row>
                <Col lg='6'>
                    <div className="newsletter__content">
                        <h2>Subscribe to get useful travelling information.</h2>
                            <Form onSubmit={handlesubmit}method="POST">
                        <div className="newsletter__input">
                                <input type="text" placeholder="Name" name="name" id="" />
                                <input type="email" placeholder='Email' name="email" id="" />
                                <Button className="btn newsletter__btn" >Subscribe</Button>
                        </div>
                            </Form>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, alias!</p>
                    </div>
                </Col>
                <Col lg='6'>
                    <div className="newsletter__img">
                        <img src={maleTourist} alt="immg" />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default NewsLetter