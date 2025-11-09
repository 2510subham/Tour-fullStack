import React, { useState, useContext } from 'react'
import './booking.css'
import { useParams } from 'react-router-dom'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { authContext } from '../../context/authContext'
import { BASE_URL } from '../../utils/Config.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Booking = ({ tour, avgRating }) => {
  console.log(tour);
  const { price, reviews, title } = tour;
  const { user } = useContext(authContext);
  console.log("user", user);
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: ''
  });
  const params = useParams();
  const handlechange = (e) => {
    setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
  };
  const proceedPayment = async (user, booking, amount) => {
    console.log(user, booking, totalamount);
    const payload = {
      user, booking, amount
    }
    const res = await fetch(`${BASE_URL}/payment`, {
      method: "POST", 
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include', // Fixed: Include cookies for authentication
      body: JSON.stringify(payload)
    })
    const data = await res.json();
    console.log("payment link data", data);
    if (!res.ok) {
      return toast.error('Payment Not created')
    }
    
    // Redirect to Razorpay payment page
    if (data.data && data.data.short_url) {
      // Store booking info in sessionStorage to retrieve after payment
      sessionStorage.setItem('pendingBooking', JSON.stringify({
        bookingId: booking._id,
        tourName: booking.tourName,
        userEmail: booking.userEmail,
        fullName: booking.fullName
      }));
      
      // Redirect to payment gateway
      window.location.href = data.data.short_url;
    } else {
      toast.error('Payment link not received');
    }
  }

  const serviceFee = 10;
  const totalamount = Number(price) * Number(booking.guestSize) + Number(serviceFee)
  //send data to the server;
  const handleClick = async (e) => {
    e.preventDefault();
    // console.log('booking');
    try {
      if (!user || user === undefined || user === null) {
        toast.error('Please sign in');
        return;
      }
      const res = await fetch(`${BASE_URL}/booking`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include', // Fixed: Include cookies for authentication
        body: JSON.stringify(booking)
      })
      const result = await res.json();
      if (!res.ok) {
        return toast.error(result.message);
      }
      toast.success('Processing to payment');
      // This will redirect to payment gateway, so code after this won't execute
      await proceedPayment(user, result?.data, totalamount);
      
      // Note: The code below will only execute if payment redirect fails
      // After successful payment, user will be redirected back via Razorpay callback
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <div className="booking">
      <ToastContainer closeButton closeOnClick position='bottom-right' />
      <div className="booking__top d-flex align-items-center justify-content-center">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i class="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>
      {/*===========booking form */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick} method="POST">
          <FormGroup>
            <input type="text" placeholder='full Name' id="fullName" required onChange={handlechange} />
          </FormGroup>
          <FormGroup>
            <input type="number" placeholder='Phone' id="phone" required onChange={handlechange} />
          </FormGroup>
          <FormGroup className='d-flex align-items-center gap-3'>
            <input type="date" placeholder='' id="bookAt" required onChange={handlechange} />
            <input type="number" placeholder='Guests' id="guestSize" required onChange={handlechange} />

          </FormGroup>
        </Form>
      </div>
      {/*=================bokking button---------------------- */}
      <div className="booking__button">
        <ListGroup >
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center gap-1'>
              ${price} <i class="ri-close-line"></i> {booking.guestSize} person
            </h5>
            <span>${Number(price) * Number(booking.guestSize)}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0'>
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 total'>
            <h5>Total</h5>
            <span>${totalamount} / Rs.{(totalamount * 88.30).toFixed(2)}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Proceed To Pay</Button>
      </div>
    </div>

  )
}

export default Booking