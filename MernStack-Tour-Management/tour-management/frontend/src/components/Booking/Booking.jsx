import React, { useState, useContext } from 'react'
import './booking.css'
import { useNavigate, useParams } from 'react-router-dom'
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
  const sendBookingMail = async () => {
    const url = `${BASE_URL}/sendMail`;
    try {
      const res = await fetch(url, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ name: booking.fullName, email: booking.userEmail, subject: "Tour Booked Successfully", message: `Dear ${booking.fullName},\n\nYour tour ${booking.tourName}  on ${booking.bookAt} has been booked successfully.\n\nThank you for choosing us.\n\n We will send you all details for your tour. \n\nRegards,\nTour Management Team` })
      }
      )
      const result = await res.json();
      if (!res.ok) {
        return toast.error(result?.message);
      }
      toast.success("Booking mail sent successfully");
    }
    catch (err) {
      toast.error(err.message);
    }
  }

  const proceedPayment = async (user, booking, amount) => {
    console.log(user, booking, totalamount);
    const payload = {
      user, booking, amount
    }
    const res = await fetch(`${BASE_URL}/payment`, {
      method: "POST", headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await res.json();
    if (!res.ok) {
      return toast.error('Payment Not craeted ')
    }
    navigate(data.short_url)


  }

  const serviceFee = 10;
  const navigate = useNavigate();
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
        body: JSON.stringify(booking)
      })
      const result = await res.json();
      if (!res.ok) {
        return toast.error(result.message);
      }
      toast.success('Processing to payment');
      const payment = await proceedPayment(user, result?.data, totalamount);
      console.log(payment);
//       {
//   accept_partial: true,
//   amount: 307,
//   amount_paid: 0,
//   cancelled_at: 0,
//   created_at: 1762592372,
//   currency: 'INR',
//   customer: { email: 'abc@gmail.com' },
//   description: 'Tour Booking Beautiful Snowy Mountains',
//   expire_by: 0,
//   expired_at: 0,
//   first_min_partial_amount: 307,
//   id: 'plink_RdBkMhSi5IIFMy',
//   notes: { policy_name: 'Tour Booking Beautiful Snowy Mountains' },
//   notify: { email: true, sms: true, whatsapp: false },
//   payments: null,
//   reference_id: '',
//   reminder_enable: true,
//   reminders: [],
//   short_url: 'https://rzp.io/rzp/foOGNW0e',
//   status: 'created',
//   updated_at: 1762592372,
//   upi_link: false,
//   user_id: '',
//   whatsapp_link: false
// }
      //now navigating to the oayment oage  from these res that i m getting from the server
      

      toast.success('Tour booked successfully');
      await sendBookingMail();
      navigate("/thank-you");
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