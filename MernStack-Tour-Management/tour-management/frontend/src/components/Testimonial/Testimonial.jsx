import React from 'react'
import Slider from 'react-slick';
import ava01 from "../../assets/images/ava-1.jpg"
import ava02 from "../../assets/images/ava-2.jpg"
import ava03 from "../../assets/images/ava-3.jpg"



const Testimonial = () => {
const settings={
    dots:true,
    infinite:true,
    speed:500,
    slidesToShow:3,
    autoplay:true,
    autoplaySpeed:2000,
    swipeToSlide:true,

    responsive:[
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        }
    ]
        
}

  return (
    <Slider {...settings}>
        <div className="testimonial py-4 px-3">
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi tenetur consequuntur autem rerum repellendus corrupti Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, nesciunt?
            </p>
            <div className='d-flex align-items-center gap-4 mt-3'>
                <img src={ava01} alt="img" className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className="mb-0 mt-3">Subham Agarwal</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonial py-4 px-3">
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi tenetur consequuntur autem rerum repellendus corrupti accusamus sequi! Nihil non voluptates corrupti, ad quaerat nesciunt pariatur dolor  
            </p>
            <div className='d-flex align-items-center gap-4 mt-3'>
                <img src={ava02} alt="img" className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className="mb-0 mt-3">abc xyz</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonial py-4 px-3">
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi tenetur consequuntur autem rerum repellendus corrupti accusamus sequi! Nihil non voluptates corrupti, ad quaerat nesciunt pariatur dolor  
            </p>
            <div className='d-flex align-items-center gap-4 mt-3'>
                <img src={ava03} alt="img" className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className="mb-0 mt-3">absdtg fetgv</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonial py-4 px-3">
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi tenetur consequuntur autem rerum repellendus corrupti accusamus sequi! Nihil non voluptates corrupti, ad quaerat nesciunt pariatur dolor  
            </p>
            <div className='d-flex align-items-center gap-4 mt-3'>
                <img src={ava02} alt="img" className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className="mb-0 mt-3">abc xyz</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonial py-4 px-3">
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi tenetur consequuntur autem rerum repellendus corrupti accusamus sequi! Nihil non voluptates corrupti, ad quaerat nesciunt pariatur dolor  
            </p>
            <div className='d-flex align-items-center gap-4 mt-3'>
                <img src={ava02} alt="img" className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className="mb-0 mt-3">abc xyz</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
    </Slider>
  )
}

export default Testimonial