import React, { Component } from 'react';
import "../../css/lessonspage.css"
import ReactCardSlider from 'react-card-slider-component';
import StudentSidebarLayout from './student_sidebar_layout';
import StudentMenuLayout from './student_menu_layout';

export default function StudentLessonsPage() {
  const slides = [
    {image:"https://picsum.photos/200/300",title:"This is a title",description:"This is a description"},
    {image:"https://picsum.photos/600/500",title:"This is a second title",description:"This is a second description"},
    {image:"https://picsum.photos/700/600",title:"This is a third title",description:"This is a third description"},
    {image:"https://picsum.photos/500/400",title:"This is a fourth title",description:"This is a fourth description"},
    {image:"https://picsum.photos/200/300",title:"This is a fifth title",description:"This is a fifth description"},
    {image:"https://picsum.photos/800/700",title:"This is a sixth title",description:"This is a sixth description"},
    {image:"https://picsum.photos/300/400",title:"This is a seventh title",description:"This is a seventh description"},
]
const slides2 = [
  {image:"https://picsum.photos/200/300",title:"This is a title",description:"This is a description"},
  {image:"https://picsum.photos/600/500",title:"This is a second title",description:"This is a second description"},
  {image:"https://picsum.photos/700/600",title:"This is a third title",description:"This is a third description"},
  {image:"https://picsum.photos/500/400",title:"This is a fourth title",description:"This is a fourth description"},
  {image:"https://picsum.photos/200/300",title:"This is a fifth title",description:"This is a fifth description"},
  {image:"https://picsum.photos/800/700",title:"This is a sixth title",description:"This is a sixth description"},
  {image:"https://picsum.photos/300/400",title:"This is a seventh title",description:"This is a seventh description"},
]
  
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
         <ReactCardSlider slides={slides2} />
           
           </div>
       

       </div>
 


     </div>

        </main>
     
               
      
        	
        
      
      
       

      </div>
      
      
    )
  
}
