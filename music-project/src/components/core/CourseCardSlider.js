import React, { Component,useState,useEffect } from 'react';
import "../../css/coursespage.css";
import {MdChevronLeft,MdChevronRight} from "react-icons/md";
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiFillLock } from 'react-icons/ai';

const CourseCardSlider = (props)=>{
    const id = localStorage.getItem('userId');
    console.log("Logged User Id in CourseCard"+id);//giriş yapanın id'sini buraya taşıyor
    const [studentLevels, setStudentLevels] = useState([]);

    const slideLeft = () =>{
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;

    }
    const slideRight = () =>{
        var slider = document.getElementById("slider");
        slider.scrollLeft= slider.scrollLeft + 500;

    }
    const [levels, setLevels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/levels')
      .then(response => setLevels(response.data))
      .catch(error => console.error(error));
      console.log("Student Levels Değelreri4 "+id);
      const studentId = id;
      console.log("Student Levels Değelreri5 "+studentId);
      axios.get(`http://localhost:5001/student-levels-by-id/${studentId}`) //${studentId}
        .then(response => setStudentLevels(response.data))
        .catch(error => console.error(error));
  }, [id]);


  

  console.log("Levels Değerleri React");
  console.log(levels);
  console.log("Öğrenci Seviyeleri");
  console.log(studentLevels);
    return (
        <div id='main-slider-container'>
                <MdChevronLeft size={40} className='slider-icon left' onClick={slideLeft}/>

                
                <div id='slider'>
                    {
                        levels.map((level) => {
                           
                            const studentLevel = studentLevels.find((item) => item.level_priority === 1);
                            if (level.level_priority > 1) {
                              
                                return(
                                    <div className='slider-card slider-card-disabled' key={level._id}>
                                       
                                        
                                        <div className='slider-card-image' style={{backgroundImage: `url(${level.level_image})`}}>
                                        <AiFillLock className='slider-card-icon' size={50} style={{ color: 'white' }}/>
                                        </div>
                                        <p className='slider-card-title'>{level.level_title}</p>
                                      
                                        <p className='slider-card-description'>{level.level_description}</p>
                                        
    
                                        
                                    </div>
        
                                )
                              

                            }
                            else if(level.level_priority<=1){
                          
                                return(
                                    <div className='slider-card' key={level._id}>
                                        <Link to={`/level-courses/${level._id}`} className='slider-card-link'>
                                        <div className='slider-card-image' style={{backgroundImage: `url(${level.level_image})`}}
    
    >
     
    
                                        </div>
                                        <p className='slider-card-title'>{level.level_title}</p>
                                            
                                        </Link>
                                      
                                        <p className='slider-card-description'>{level.level_description}</p>
                                        
    
                                        
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
export default CourseCardSlider;
