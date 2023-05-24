import React, { Component,useState,useEffect } from 'react';
import "../../css/coursespage.css";
import {MdChevronLeft,MdChevronRight} from "react-icons/md";
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';
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
    axios.get('http://localhost:5000/levels')
      .then(response => setLevels(response.data))
      .catch(error => console.error(error));
  }, []);
  
  useEffect(() => {
    axios.get(`http://localhost:5000/student-levels/${id}`)
      .then(response => setStudentLevels(response.data))
      .catch(error => console.error(error));
  }, []);
  

  console.log("Levels Değerleri React");
  console.log(levels);
    return (
        <div id='main-slider-container'>
                <MdChevronLeft size={40} className='slider-icon left' onClick={slideLeft}/>

                
                <div id='slider'>
                    {
                        levels.map((level) => {
                            return(
                                <div className='slider-card' key={level._id}>
                                    <div className='slider-card-image' style={{backgroundImage: `url(${level.level_image})`}}

>
                                    
                                        

                                    </div>
                                    <p className='slider-card-title'>{level.level_title}</p>
                                    <p className='slider-card-description'>{level.level_description}</p>
                                    

                                    
                                </div>
    
                            )
                        })
                    }

                </div>
                <MdChevronRight size={40} className='slider-icon right' onClick={slideRight}/>
            </div>
       
    )
}
export default CourseCardSlider;
