import React, { Component, useState } from "react";
import "../../css/adminloginpage.css"//harici css dahil etme
import MyImage from "../../assets/images/user.png";
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function AdminAuthenticationPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const navigateToAdminMainPage = () => {
    navigate('/adminMainPage');
  };

  function handleSubmitForLogin(e) {
    e.preventDefault();

    console.log(username, password);
    fetch("http://localhost:27017/login-admin", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("login successful");
        
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          navigateToAdminMainPage();//giriş başarılı ise bu sayfaya yönlendirsin
        }
      });
  }

  return (

    <div className="authentication">
        
        <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-danger mt-5">Admin Giriş Sayfası</h2>
        
        <div class="card my-5">

          <form class="card-body cardbody-color p-lg-5" onSubmit={handleSubmitForLogin}>

            <div class="text-center">
              <img src={MyImage} class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile"/>
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" id="Username" aria-describedby="emailHelp"
                placeholder="Kullanıcı Adı" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="password" placeholder="Şifre" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Giriş Yap</button></div>
            
          </form>
        </div>

      </div>
    </div>
  </div>
      

     
        
      
       
      </div>
   
  );
}
