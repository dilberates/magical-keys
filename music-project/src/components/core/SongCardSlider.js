import React, { Component,useState,useEffect } from 'react';
import "../../css/coursespage.css";
import {MdChevronLeft,MdChevronRight} from "react-icons/md";
const SongCardSlider = (props)=>{
    const slides = [1,2,3,4,5,6,7,8];
    const slideLeft = () =>{
        var slider = document.getElementsByClassName("songSlider");
        slider.scrollLeft = slider.scrollLeft + 500;

    }
    const slideRight = () =>{
        var slider = document.getElementsByClassName("songSlider");
        slider.scrollLeft= slider.scrollLeft - 500;

    }
    return (
        <div id='main-slider-container'>
                <MdChevronLeft size={40} className='slider-icon left' onClick={slideLeft}/>

                
                <div id='slider' className='songSlider'>
                    {
                        slides.map((slide,index) => {
                            return(
                                <div className='slider-card'>

                                    
                                </div>
    
                            )
                        })
                    }

                </div>
                <MdChevronRight size={40} className='slider-icon right' onClick={slideRight}/>
            </div>
       
    )
}
export default SongCardSlider;
