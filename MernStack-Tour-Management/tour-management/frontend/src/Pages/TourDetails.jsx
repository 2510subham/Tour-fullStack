import React, { useRef, useState, useEffect, useContext } from 'react'
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom';
// import tourData from '../assets/data/tours'
import calculateAverageRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import NewsLetter from "../Shared/NewsLetter"
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/Config.js';
import { authContext } from '../context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TourDetails = () => {
  const { id } = useParams();
  // console.log("id=", id);
  const reviewmsgref = useRef('');
  const [tourrating, settourrating] = useState(null);
  const { user } = useContext(authContext);

  //fetch datafrom database
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`)

  console.log(tour);
  //destructuring the properties from our tour object
  const { photo, title, desc, price, reviews, address, city, distance, maxGroupSize } = tour
  console.log(reviews)
  const { totalRating, avgRating } = calculateAverageRating(reviews);
  //format date
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  //submit request to server
  const submithandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewmsgref.current.value;

    try {
      if (!user || user === undefined || user === null) {
        toast.error("please sign in")
        return
      }
      const reviewobj = {
        username: user?.username,
        reviewText,
        rating: tourrating,
      }
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reviewobj)
      })
      const result = await res.json();
      if (!res.ok) {
        return toast.error(result.message);
      }
      toast.success("Review Submitted Successfully");
    } catch (err) {
      toast.error(err.message)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);

  }, [tour])


  return (
    <>
      <ToastContainer closeButton closeOnClick position='bottom-right' />
      <section>
        <Container>
          {loading && <h4 className='text-center pt-5'>Loading...</h4>}
          {error && <h4 className='text-center pt-5'>{error}</h4>}
          {!loading && !error &&
            <Row>
              <Col lg='8'>
                <div className="tour__content">
                  <img src={photo} alt="pics" />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className='tour__rating d-flex align-items-center gap-1'>
                        <i class="ri-star-fill" style={{ 'color': "var(--secondary-color)" }}></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not Rated") : (
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
                    <h1>Reviews: ({reviews?.length} reviews)</h1>
                    <Form onSubmit={submithandler}>
                      <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                        <span onClick={() => settourrating(1)}>
                          1 <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => settourrating(2)}>
                          2 <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => settourrating(3)}>
                          3 <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => settourrating(4)}>
                          4 <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => settourrating(5)}>
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
                        reviews?.map((review) => (
                          <div className="review__item">
                            <img src={avatar} alt="" />
                            <div className="w-100">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h5>{review.username}</h5>
                                  <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                                </div>
                                <span className='d-flex align-items-center'>
                                  {review.rating} <i class="ri-star-fill"></i>
                                </span>
                              </div>
                              <h6>{review.reviewText}</h6>
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
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>

          }
        </Container>
      </section>
      <NewsLetter />
    </>
  )
}

export default TourDetails;