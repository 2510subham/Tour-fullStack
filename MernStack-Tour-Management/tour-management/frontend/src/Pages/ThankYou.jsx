import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { BASE_URL } from '../utils/Config';
import { toast, ToastContainer } from 'react-toastify';
import "../styles/thank-you.css";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('pending');

  useEffect(() => {
    // Check if this is a callback from payment gateway
    // const paymentId = searchParams.get('razorpay_payment_id'); // For future use
    // const paymentLinkId = searchParams.get('razorpay_payment_link_id'); // For future use
    const paymentStatus = searchParams.get('razorpay_payment_link_status');

    // Get booking info from sessionStorage
    const pendingBooking = sessionStorage.getItem('pendingBooking');

    if (paymentStatus === 'paid' && pendingBooking) {
      // Payment successful
      setPaymentStatus('success');
      const bookingData = JSON.parse(pendingBooking);

      // Send confirmation email
      sendBookingMail(bookingData);

      // Clear the pending booking
      sessionStorage.removeItem('pendingBooking');
    } else if (paymentStatus === 'cancelled' || paymentStatus === 'failed') {
      // Payment failed or cancelled
      setPaymentStatus('failed');
      toast.error('Payment was not completed. Please try again.');
    } else if (pendingBooking) {
      // User came directly without completing payment
      setPaymentStatus('pending');
      toast.warning('Payment verification pending...');
    }

    setLoading(false);
  }, [searchParams]);

  const sendBookingMail = async (bookingData) => {
    const url = `${BASE_URL}/sendMail`;
    try {
      const res = await fetch(url, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          name: bookingData.fullName,
          email: bookingData.userEmail,
          subject: "Tour Booked Successfully",
          message: `Dear ${bookingData.fullName},\n\nYour tour "${bookingData.tourName}" has been booked successfully.\n\nPayment has been received.\n\nThank you for choosing us. We will send you all details for your tour.\n\nRegards,\nTour Management Team`
        })
      });

      if (res.ok) {
        console.log('Confirmation email sent successfully');
      }
    } catch (err) {
      console.error('Error sending confirmation email:', err);
    }
  };

  if (loading) {
    return (
      <section>
        <Container>
          <Row>
            <Col lg='12' className='pt-5 text-center'>
              <h3>Processing your payment...</h3>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <ToastContainer closeButton closeOnClick position='bottom-right' />
      <Container>
        <Row>
          <Col lg='12' className='pt-5 text-center '>
            <div className="thank__you">
              {paymentStatus === 'success' ? (
                <>
                  <span>
                    <i className="ri-checkbox-circle-line"></i>
                  </span>
                  <h1 className="mb-3 fw-semibold">Thank You!</h1>
                  <h3 className="mb-4">
                    Your tour is booked successfully.
                  </h3>
                  <p className="mb-4">
                    Payment completed! A confirmation email has been sent to your inbox.
                  </p>
                </>
              ) : paymentStatus === 'failed' ? (
                <>
                  <span style={{ color: 'red' }}>
                    <i className="ri-close-circle-line"></i>
                  </span>
                  <h1 className="mb-3 fw-semibold">Payment Failed</h1>
                  <h3 className="mb-4">
                    Your payment could not be processed.
                  </h3>
                  <p className="mb-4">
                    Please try booking again or contact support.
                  </p>
                </>
              ) : (
                <>
                  <span style={{ color: 'orange' }}>
                    <i className="ri-time-line"></i>
                  </span>
                  <h1 className="mb-3 fw-semibold">Payment Pending</h1>
                  <h3 className="mb-4">
                    Please complete your payment to confirm the booking.
                  </h3>
                </>
              )}
              <Button className='btn primary__btn w-25'>
                <Link to="/home">Back to Home</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;