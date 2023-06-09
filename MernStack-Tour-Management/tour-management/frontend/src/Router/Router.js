import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import { Home,Login,TourDetails,Tours,SearchResultList,Register,About } from '../Pages'
import ThankYou from '../Pages/ThankYou'
import MasonaryImagesGallery from '../components/image-gallery/MasonaryImagesGallery'

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element ={<About/>}/>
        <Route path="/gallery" element={<MasonaryImagesGallery/>} />
        <Route path="/tours/:id" element={<TourDetails/>} />
        <Route path="/tours" element={<Tours/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/thank-you" element={<ThankYou/>} />
        <Route path="/tours/search" element={<SearchResultList/>} />
    </Routes>
  )
}

export default Router