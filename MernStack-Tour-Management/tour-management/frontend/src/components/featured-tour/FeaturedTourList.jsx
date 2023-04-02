import React from 'react'
import TourCard from '../../Shared/TourCard'
import {Col} from 'reactstrap'
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/Config'

const FeaturedTourList = () => {
    //data coming afetr hitting api from  mongodb 

    const {data,loading,error}=useFetch(`${BASE_URL}/tours/search/getfeaturedtours`);
    // console.log(data);
    // let value=featuredTour;
    // if(featuredTour.data){
    //     value=featuredTour.data;
    // }
  return (
   <>
        {
            loading && <h4>Loading......</h4>
        }
        {
            error && <h4>{error}</h4>
        }
    {
        !loading && !error && data?.map((tour,index)=>(
            <Col className='mb-4' md='6' sm='6' lg='3' key={index}>
                <TourCard tour={tour}/>
            </Col>
        ))
    }
   </>
  )
}

export default FeaturedTourList