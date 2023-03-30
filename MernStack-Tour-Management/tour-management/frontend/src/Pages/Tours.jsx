import React,{useState,useEffect} from 'react'
import CommonSection from '../Shared/CommonSection.jsx'
import "../styles/tour.css";
import NewsLetter from '../Shared/NewsLetter.jsx';
import tourData from '../assets/data/tours'
import TourCard from '../Shared/TourCard';
import Searchbar from '../Shared/Searchbar.jsx';
import { Container,Row,Col } from 'reactstrap';
const Tours = () => {
  const [pagecount,setpagecount]=useState(0);
  const [page,setpage]=useState(0);
  useEffect(() => {
   const pages=Math.ceil(5/2);//later we will use backend data count
   setpagecount(pages);
  }, [page])
  
  return ( 
    <>
      <CommonSection title={"All Tours"}/> 
      <section>
        <Container>
          <Row>
              <Searchbar/>
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          <Row>
            {
              tourData.map((tour,index)=>(
                <Col lg='3' className='mb-4' key={index}>
                  <TourCard tour={tour}/>
                </Col>
              ))
            }
            <Col lg='12'>
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {
                  [...Array(pagecount).keys()].map((number)=>(
                    <span key={number} onClick={()=>setpage(number)}
                      className={page===number?"active__page":""}
                    >
                      {number+1}
                      </span>
                  ))
                }
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <NewsLetter/>
    </>
  )
}

export default Tours