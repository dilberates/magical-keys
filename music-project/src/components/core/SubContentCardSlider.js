import React, { Component,useState,useEffect } from 'react';
import "../../css/lessonspage.css"

import axios from "axios";

import { Link } from 'react-router-dom';
import { AiFillLock } from 'react-icons/ai';
import {MdChevronLeft,MdChevronRight} from "react-icons/md";
const SubContentCardSlider = (props)=> {
  const userId = localStorage.getItem('userId');
  const contentId = localStorage.getItem('courseId');
  const [contentSubCourses, setContentSubCourses] = useState([]);
  

  const slideLeft = () =>{
      var slider = document.getElementById("slider");
      slider.scrollLeft = slider.scrollLeft - 500;

  }
  const slideRight = () =>{
      var slider = document.getElementById("slider");
      slider.scrollLeft= slider.scrollLeft + 500;

  }


useEffect(() => {
    console.log("Sub Contents  Değelreri "+contentId);
    const courseId =contentId;
    console.log("Sub Contents  Değelreri 2 "+courseId);
    axios.get(`http://localhost:5001/sub-contents-by-content-id/${contentId}`) //${studentId}
      .then(response => setContentSubCourses(response.data))
      .catch(error => console.error(error));
}, [contentId]);


console.log("Kurs Alt İçerikleri");
console.log(contentSubCourses);

  return (
      <div id='main-slider-container'>
              <MdChevronLeft size={40} className='slider-icon left' onClick={slideLeft}/>

              
              <div id='slider'>
                  {
                      contentSubCourses.map((contentSubCourse) => {
                         
                          //const studentLevel = studentCourses.find((item) => item.content_priority === 1);
                          <div className='slider-card' key={contentSubCourse._id}>
                          <Link to={`/content-subcontents/${contentSubCourse._id}`} className='slider-card-link'>
                              {window.localStorage.setItem('courseId', contentSubCourse._id)}
                          <div className='slider-card-image' style={{backgroundImage: `url(${contentSubCourse.sub_content_image})`}}

>


                          </div>
                          <p className='slider-card-title'>{contentSubCourse.sub_content_title}</p>
                              
                          </Link>
                        
                          <p className='slider-card-description'>{contentSubCourse.sub_content_description}</p>
                          

                          
                      </div>
                    
                         
                      })
                  }

              </div>
              <MdChevronRight size={40} className='slider-icon right' onClick={slideRight}/>
          </div>
     
  )
  
}
export default SubContentCardSlider;
