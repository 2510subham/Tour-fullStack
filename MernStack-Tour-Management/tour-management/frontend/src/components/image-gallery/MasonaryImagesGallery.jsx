import React from 'react'
import Masonry,{ResponsiveMasonry} from 'react-responsive-masonry';
import galleryImages from './galleryimages';
const MasonaryImagesGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{350:1,768:3,992:4}}>
        <Masonry gutter='1rem'>
            {
                galleryImages.map((image,index) => (
                    <img className='masonry__img' src={image} alt="imgs" key={index} style={{width:'100%',
                    display:'block',
                                borderRadius:'10px'}} />
                ))

            }
        </Masonry>
    </ResponsiveMasonry>
  )
}

export default MasonaryImagesGallery