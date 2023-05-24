import React, { Component,useState,useEffect } from 'react';
import "../../css/lessonspage.css"
import ReactCardSlider from 'react-card-slider-component';
import StudentSidebarLayout from './student_sidebar_layout';
import StudentMenuLayout from './student_menu_layout';
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';
import CourseCardSlider from '../core/CourseCardSlider';
import SongCardSlider from '../core/SongCardSlider';
export default function StudentContentPage() {
  const userId = localStorage.getItem('userId');
  console.log("Logged User Id in Student Page"+userId);//giriş yapanın id'sini buraya taşıyor

    return (
      <div className="authentication">
        <StudentMenuLayout></StudentMenuLayout>
        <StudentSidebarLayout></StudentSidebarLayout>
        <main id="main" class="main">
        <div className="row lessons">
       
       <div className='col-12'>
         <div className='row lessons'>
          <h2>DERSLER</h2>
         
         <CourseCardSlider/>
         

         </div>
         <div className='row lessons'>
         <h2>ŞARKILAR</h2>
         <SongCardSlider/>
           
           </div>
       

       </div>
 


     </div>

        </main>
     
               
      
        	
        
      
      
       

      </div>
      
      
    )
  
}
