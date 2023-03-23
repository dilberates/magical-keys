import React, { Component } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import "../css/mainpage.css"//harici css dahil etme

export default function MainPage() {
  //butona tıklayınca /authenticationPage'de yönlendirecek. Bu yönlendirmeyi App.js içinde tanımlanan
  //route  <Route path="/authenticationPage" element={<TeacherAuthenticationPage/>} /> ile yapıyor
  //Burası uygulama açılış sayfası 
  //bu şekilde yapılacak yönlendirmeler app.js'e yazılır
  const navigate = useNavigate();
    const navigateToSignInUp = () => {
      navigate('/authenticationPage');
    };
    return (
      <div className="button-container" style={{ 
          backgroundImage: `url(${process.env.PUBLIC_URL + '/img/background.png'})` ,
          backgroundSize:'cover'
        }}>
  <button className="buttonEnter" >Öğrenci Giriş/Kayıt Sayfası</button>
  <button className="buttonEnter" onClick={navigateToSignInUp}>Öğretmen Giriş/Kayıt Sayfası</button>
</div>
  );


}

