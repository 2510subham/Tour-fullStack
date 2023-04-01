import React,{useState} from 'react'

import CommonSection from '../Shared/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import TourCard from '../Shared/TourCard';
import NewsLetter from '../Shared/NewsLetter';
///  this page comming afetr hitting this -> tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}
//by the help of uselocation we can break the url into 
//**  pathname=/tours/search  , search= city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize} and state=[] is the array */

const SearchResultList = () => {
  const location = useLocation(); // location is an object inside this we get state and pathname
  // console.log(location);
  const [data] = useState(location.state);//we are extracting state array from the location object
  // console.log(data);

  return (
    <>
      <CommonSection title={"Tour search Result"} />
      <section>
        <Container>
          <Row>
            
                {
                  data.length===0 ? (<h1 className='text-center'>No Tour Found</h1>) : 
                  (data?.map((item) => (
                    <Col lg='3' className='mb-4'>
                      <TourCard tour={item} key={item._id}/>
                    </Col>
                    )
                  ))
                }
            
          </Row>
        </Container>
      </section>
      <NewsLetter/>
    </>
  )
}

export default SearchResultList