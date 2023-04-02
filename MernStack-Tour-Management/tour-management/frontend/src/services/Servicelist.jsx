import React from 'react'
import ServicesCrad from './ServicesCrad'
import {Col} from 'reactstrap';
import weatherImg from "../assets/images/weather.png"
import guideImg from "../assets/images/guide.png"
import customizationImg from "../assets/images/customization.png"

const servicesData = [
    {
        imgurl: weatherImg,
        title: ' Calculate weather',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, adipisci perferendis eum, aperiam deleniti inventore modi natus magnam officia laborum nobis tenetur qui distinctio excepturi tempora enim ad reiciendis quam.'
    },
    {
        imgurl: guideImg,
        title: 'Best Tour Guide',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, adipisci perferendis eum, aperiam deleniti inventore modi natus magnam officia laborum nobis tenetur qui distinctio excepturi tempora enim ad reiciendis quam.'
    },
    {
        imgurl: customizationImg,
        title: 'customization',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, adipisci perferendis eum, aperiam deleniti inventore modi natus magnam officia laborum nobis tenetur qui distinctio excepturi tempora enim ad reiciendis quam.'
    },
]

const Servicelist = () => {
  return (
    
    <>
    {
        servicesData.map((items,index)=>
        <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
            <ServicesCrad items={items}/>
        </Col>
        )

    }
    </>
  )
}

export default Servicelist