import React, { Component,useState,useEffect } from 'react';
import "../../css/lessonspage.css"

import axios from "axios";

import { Link } from 'react-router-dom';
import { AiFillLock } from 'react-icons/ai';
import {MdChevronLeft,MdChevronRight} from "react-icons/md";
const ContentCardSlider = (props)=> {
  const userId = localStorage.getItem('userId');
  const levelId = localStorage.getItem('levelId');
  const [levelCourses, setLevelCourses] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);

  const slideLeft = () =>{
      var slider = document.getElementById("slider");
      slider.scrollLeft = slider.scrollLeft - 500;

  }
  const slideRight = () =>{
      var slider = document.getElementById("slider");
      slider.scrollLeft= slider.scrollLeft + 500;

  }


useEffect(() => {
    console.log("Contents  Değelreri "+levelId);
    const levelid =levelId;
    console.log("Contents  Değelreri 2 "+levelid);
    axios.get(`http://localhost:5001/student-levels-by-id/${userId}`) //${studentId}
        .then(response => setStudentCourses(response.data))
        .catch(error => console.error(error));
    axios.get(`http://localhost:5001/courses-by-level-id/${levelId}`) //${studentId}
      .then(response => setLevelCourses(response.data))
      .catch(error => console.error(error));
}, [levelId]);


console.log("Seviye Kursları");
console.log(levelCourses);

  return (
      <div id='main-slider-container'>
              <MdChevronLeft size={40} className='slider-icon left' onClick={slideLeft}/>

              
              <div id='slider'>
                  {
                      levelCourses.map((levelCourse) => {
                         
                          const studentLevel = studentCourses.find((item) => item.content_priority === 1);
                          if (levelCourse.content_priority > 1) {
                            
                              return(
                                  <div className='slider-card slider-card-disabled' key={levelCourse._id}>
                                     
                                      
                                      <div className='slider-card-image' style={{backgroundImage: `url(${levelCourse.content_image})`}}>
                                      <AiFillLock className='slider-card-icon' size={50} style={{ color: 'white' }}/>
                                      </div>
                                      <p className='slider-card-title'>{levelCourse.content_title}</p>
                                    
                                      <p className='slider-card-description'>{levelCourse.content_description}</p>
                                      
  
                                      
                                  </div>
      
                              )
                            

                          }
                          else if(levelCourse.content_priority<=1){
                        
                              return(
                                  <div className='slider-card' key={levelCourse._id}>
                                      <Link to={`/level-courses/${levelCourse._id}`} className='slider-card-link'>
                                          {window.localStorage.setItem('courseId', levelCourse._id)}
                                      <div className='slider-card-image' style={{backgroundImage: `url(${levelCourse.content_image})`}}
  
  >
   
  
                                      </div>
                                      <p className='slider-card-title'>{levelCourse.content_title}</p>
                                          
                                      </Link>
                                    
                                      <p className='slider-card-description'>{levelCourse.content_description}</p>
                                      
  
                                      
                                  </div>
      
                              )

                          }
                         
                      })
                  }

              </div>
              <MdChevronRight size={40} className='slider-icon right' onClick={slideRight}/>
          </div>
     
  )
  
}
export default ContentCardSlider;
