import React,{useState,useEffect} from 'react'
import CommonSection from '../Shared/CommonSection.jsx'
import "../styles/tour.css";
import NewsLetter from '../Shared/NewsLetter.jsx';
// import tourData from '../assets/data/tours'
import TourCard from '../Shared/TourCard';
import Searchbar from '../Shared/Searchbar.jsx';
import { Container,Row,Col } from 'reactstrap';
import useFetch from '../hooks/useFetch.js';
import { BASE_URL } from '../utils/Config.js';

const Tours = () => {
  const [pagecount,setpagecount]=useState(0);
  const [page,setpage]=useState(0);
  const {
    data:tours,
    loading,
    error
  }=useFetch(`${BASE_URL}/tours?page=${page}`);
  // console.log(tours);
  // let value=tours;
  //   if(tours.data){
  //       value=tours.data;
  //   }
  const {data:tourCounts}=useFetch(`${BASE_URL}/tours/search/gettourcount`)
  // let tourCount=tourCounts;
  // if(tourCounts.data){
  //   tourCount=tourCounts.data;
  // }
  console.log(tourCounts);

  useEffect(() => {
   const pages=Math.ceil(tourCounts/8);//later we will use backend data count
   setpagecount(pages);
   window.scrollTo(0,0);
  }, [page,tourCounts,tours])

  
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
          {loading && <h4 className='text-center pt-5'> Loading....</h4>}
          {error && <h4 className='text-center pt-5'>{error}</h4>}

          {
            !loading && !error && <Row>
            {
              tours?.map((tour)=>(
                <Col lg='3' className='mb-4' key={tour._id}>
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
          }
        </Container>
      </section>
      <NewsLetter/>
    </>
  )
}

export default Tours