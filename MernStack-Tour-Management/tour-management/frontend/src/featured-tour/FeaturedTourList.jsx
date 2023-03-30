import React from 'react'
import TourCard from '../Shared/TourCard'
import tourData from "../assets/data/tours"
import {Col} from 'reactstrap'

const FeaturedTourList = () => {
  return (
   <>
    {
        tourData.map((tour,index)=>(
            <Col className='mb-4' lg='3' key={index}>
                <TourCard tour={tour}/>
            </Col>
        ))
    }
   </>
  )
}

export default FeaturedTourList