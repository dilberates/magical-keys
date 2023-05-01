import React, { Component,useState,useEffect } from 'react';
import "../../css/lessonspage.css"
import ReactCardSlider from 'react-card-slider-component';
import StudentSidebarLayout from './student_sidebar_layout';
import StudentMenuLayout from './student_menu_layout';
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';
export default function StudentLessonPage() {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/levels')
      .then(response => setLevels(response.data))
      .catch(error => console.error(error));
  }, []);
  console.log("Levels Değerleri React");
  console.log(levels);

  const slides = levels.map((level) => {
    return {
      image: "https://cdn.pixabay.com/photo/2018/03/30/10/51/silhouette-3275055__480.png", // Burada her slide için aynı resmi kullandım.
      title: level.level_title,
      description: level.level_description
    };
  });

  console.log("Slides3 Değerleri");
  console.log(slides);
  const [selectedValue, setSelectedValue] = useState(50);

  function handleSliderChange(value) {
    setSelectedValue(value);
  }

 
 

 
  
    return (
      <div className="authentication">
        <StudentMenuLayout></StudentMenuLayout>
        <StudentSidebarLayout></StudentSidebarLayout>
        <main id="main" class="main">
        <div className="row lessons">
       
       <div className='col-12'>
         <div className='row lessons'>
         
         <ReactCardSlider slides={slides} />
         

         </div>
         <div className='row lessons'>
         <ReactCardSlider slides={slides} />
           
           </div>
       

       </div>
 


     </div>

        </main>
     
               
      
        	
        
      
      
       

      </div>
      
      
    )
  
}
