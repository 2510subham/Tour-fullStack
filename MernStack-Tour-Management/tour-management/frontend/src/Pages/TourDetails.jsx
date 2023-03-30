import React,{useRef,useState} from 'react'
import "../styles/tour-details.css";
import {Container, Row,Col,Form,ListGroup} from 'reactstrap'
import { useParams } from 'react-router-dom';
import tourData from '../assets/data/tours'
import calculateAverageRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import NewsLetter from "../Shared/NewsLetter"

const TourDetails = () => {
  const {id}=useParams();
  const reviewmsgref=useRef('');
  const [tourrating,settourrating]=useState(null);
  //this an static data later we will call our API and load data from database
  const tour=tourData.find(tour=>tour.id===id);
  //destructuring the properties from our tour object
  const {photo,title,desc,price,reviews,address,city,distance,maxGroupSize}=tour
  const {totalRating,avgRating}=calculateAverageRating(reviews);
  //format date
  const options={day:'numeric',month:'long',year:'numeric'}
  //submit request to server
  const submithandler=(e)=>{
    e.preventDefault();
    const reviewmsg=reviewmsgref.current.value;
    //later we call api
  }
  return (
    <>
    <section>
      <Container>
        <Row>
          <Col lg='8'>
            <div className="tour__content">
              <img src={photo} alt="pics" />
              <div className="tour__info">
                <h2>{title}</h2>
                <div className="d-flex align-items-center gap-5">
                <span className='tour__rating d-flex align-items-center gap-1'>
                    <i class="ri-star-fill" style={{'color':"var(--secondary-color)"}}></i> 
                    {avgRating===0?null:avgRating}
                    {totalRating===0?(
                        "Not Rated"):(
                            <span>({reviews?.length})</span>
                        )
                    }  
                </span>
                      <span>
                      <i class="ri-map-pin-user-fill"></i> {address}
                      </span>
                </div>
                <div className="tour__extra-details">
                  <span>
                  <i class="ri-map-pin-2-line"></i> {city}
                  </span>
                  <span>
                  <i class="ri-money-dollar-circle-line"></i> ${price} per person
                  </span>
                  <span>
                  <i class="ri-map-pin-time-line"></i>{distance} k/m
                  </span>
                  <span>
                  <i class="ri-group-line"></i> {maxGroupSize} people
                  </span>
                </div>
                <h5>Description</h5>
                <p>{desc}</p>
              </div>
              {/* =================  tour reviews section======= */}
              <div className="tour__reviews mt-4">
                <h1>Reviews: ({reviews.length} reviews)</h1>
                <Form omSubmit={submithandler}>
                  <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                    <span onClick={()=>settourrating(1)}>
                      1 <i class="ri-star-fill"></i>
                    </span>
                    <span onClick={()=>settourrating(2)}>
                      2 <i class="ri-star-fill"></i>
                    </span>
                    <span onClick={()=>settourrating(3)}>
                      3 <i class="ri-star-fill"></i>
                    </span>
                    <span onClick={()=>settourrating(4)}>
                     4 <i class="ri-star-fill"></i>
                    </span>
                    <span onClick={()=>settourrating(5)}>
                     5 <i class="ri-star-fill"></i>
                    </span>
                  </div>
                  <div className="review__input">
                    <input type="text" ref={reviewmsgref} placeholder='share your thoughts' required />
                    <button className="btn primary__btn text-white" type="submit">Submit</button>
                  </div>
                </Form>
                    <ListGroup className='user__reviews'>
                    {
                      reviews.map((review,index)=>(
                        <div className="review__item">
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>subham</h5>
                                <p>{new Date("18-03-2023").toLocaleDateString("en-US",options)}</p>
                              </div>
                              <span className='d-flex align-items-center'>
                              5 <i class="ri-star-fill"></i>
                              </span>
                            </div>
                            <h6>Amazing tour</h6>
                          </div>
                        </div>
                      ))
                    }
                    </ListGroup>
              </div>
              {/* =================  tour reviews section end======= */}
            </div>
          </Col>
          <Col lg='4'>
                    <Booking tour={tour} avgRating={avgRating}/>
          </Col>
        </Row>
      </Container>
    </section>
    <NewsLetter/>
    </>
  )
}

export default TourDetails