import React,{useState} from 'react'
import './booking.css'
import { useNavigate } from 'react-router-dom'
import {Form,FormGroup,ListGroup,ListGroupItem,Button } from 'reactstrap'

const Booking = ({tour,avgRating}) => {
  const {price,reviews}=tour;
  const [credentials, setcredentials] = useState({
    userId:'01',//later it will be dynamic
    userEmail:'subahm@subham.com',
    fullName:'',
    phone:'',
    guestSize:1,
    bookAt:''
  })
  const handlechange=(e)=>{
    setcredentials(prev=>({...prev,[e.target.id]:e.target.value}))
  };

  const serviceFee=10;
  const navigate=useNavigate();
  const totalamount=Number(price)*Number(credentials.guestSize)+Number(serviceFee)
  //send data to the server;
  const handleClick=(e)=>{
    e.preventDefault();
    navigate("/thank-you");
  }
  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-center">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i class="ri-star-fill"></i>
        {avgRating===0?null:avgRating} ({reviews?.length})
        </span>
      </div>
      {/*===========booking form */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
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
                ${price} <i class="ri-close-line"></i> {credentials.guestSize} person
              </h5>
              <span>${Number(price)*Number(credentials.guestSize)}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0'>
              <h5>Service charge</h5>
              <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 total'>
              <h5>Total</h5>
              <span>${totalamount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
      </div>
    </div>

  )
}

export default Booking