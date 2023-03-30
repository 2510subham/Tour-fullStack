import React from 'react'

import CommonSection from '../Shared/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import TourCard from '../Shared/TourCard';

const SearchResultList = () => {
  const location = useLocation(); // location is an object inside this we get state and pathname
  const { state } = location;

  return (
    <>
      <CommonSection title={"Tour search Result"} />
      <section>
        <Container>
          <Row>
            <Col>
            
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default SearchResultList