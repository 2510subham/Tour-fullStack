import React,{useRef} from 'react'
import "./searchbar.css"
import { Col, Form, FormGroup } from 'reactstrap'

const Searchbar = () => {
    const locationRef= useRef('');
    const distanceRef= useRef(0);
    const maxGroupRef= useRef(0);

    const searchHandler = () => {       
        const location = locationRef.current.value;
        const distance = distanceRef.current.value;
        const maxGroup = maxGroupRef.current.value;
        
        if(location==='' || distance==='' || maxGroup===''){
            return alert("all fields are required!")
        }
    }

    return (
        <Col lg='12'>
            <div className="search__bar">
            <Form className="d-flex align-items-center gap-4">
                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                    <span>
                        <i class="ri-map-pin-line"></i> 
                    </span>
                    <div>
                    <h6>Location</h6>
                        <input type="text" placeholder='Where are you going?' ref={locationRef}/>
                    </div>
                </FormGroup>
                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                    <span>
                        <i class="ri-pin-distance-line"></i>
                    </span>
                    <div className="">
                        <h6>Distance</h6>
                        <input type="number" placeholder='Distance K/m' ref={distanceRef}/>
                    </div>
                </FormGroup>
                <FormGroup className='d-flex gap-3 form__group form__group-last'>
                    <span>
                        <i class="ri-group-line"></i>
                    </span>
                    <div className="">
                        <h6>Max People</h6>
                        <input type="number" placeholder='0' ref={maxGroupRef}/>
                    </div>
                </FormGroup>
                <span className="search__icon" type="submit"onSubmit={searchHandler}>
                <i class="ri-search-line"></i>
                </span>
            </Form>
            </div>
        </Col>
    )
}

export default Searchbar