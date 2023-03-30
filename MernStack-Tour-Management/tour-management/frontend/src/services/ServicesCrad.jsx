import React from 'react'
import "./services-card.css"
const ServicesCrad = ({items}) => {
    const {imgurl,title,desc}=items
  return (
   <div className="service__item">
    <div className="service__img">
        <img src={imgurl} alt="imageOfCard" />
    </div>
    <h5 className="">{title}</h5>
    <p className="">{desc}</p>
   </div>
  )
}

export default ServicesCrad