import React, { Component,useState,useEffect } from 'react';
import "../../css/coursespage.css";
import {MdChevronLeft,MdChevronRight} from "react-icons/md";
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiFillLock } from 'react-icons/ai';
const SongCardSlider = (props)=>{
    const id = localStorage.getItem('userId');
    console.log("Logged User Id in CourseCard"+id);//giriş yapanın id'sini buraya taşıyor
    const [songs, setSongs] = useState([]);

    const slideLeft = () =>{
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;

    }
    const slideRight = () =>{
        var slider = document.getElementById("slider");
        slider.scrollLeft= slider.scrollLeft + 500;

    }


  useEffect(() => {
    axios.get('http://localhost:5001/songs')
      .then(response => setSongs(response.data))
      .catch(error => console.error(error));
  }, []);
    return (
        <div id='main-slider-container'>
                <MdChevronLeft size={40} className='slider-icon left' onClick={slideLeft}/>

                
                <div id='slider' className='songSlider'>
                    {
                        songs.map((song) => {
                            return(
                                <div className='slider-card'>
                                    <div className='slider-card-image' style={{backgroundImage: `url(${song.song_image})`}}>
                                        
                                        </div>
                                        <p className='slider-card-title'>{song.song_name}</p>
                                      
                                        <p className='slider-card-description'>{song.song_description}</p>


                                    
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
