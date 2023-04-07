import React, { Component, useState } from "react";
import "../../css/loginregister.css"//harici css dahil etme
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function TeacherAuthenticationPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const navigateToTeacherMainPage = () => {
    navigate('/teacherMainPage');
  };

  function handleSubmitForLogin(e) {
    e.preventDefault();

    console.log(username, password);
    fetch("http://localhost:5000/login-teacher", {
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

          navigateToTeacherMainPage(); //giriş başarılı ise bu sayfaya yönlendirsin
          
        }
      });
  }


  const handleSubmitForRegister = (e) => {
    e.preventDefault();

      console.log(username, password, confirmPassword, fullname,email);
      if(password.length!="" || confirmPassword.length!="" || username.length!="" || fullname.length!="" || email.length!=""){
        if(password==confirmPassword){
          fetch("http://localhost:5000/register-teacher", {
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
          confirmPassword,
          fullname,
          email
        
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status == "ok") {
            alert("Registration Successful");
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setFullname("");
          } else {
            alert("Something went wrong");
          }
        });

        }
        else{
          alert("Şifre ve tekrar şifre alanları uyumlu olmalıdır.");
        }

      }
      else{
        alert("Alanlar boş geçilemez!");
      }
      
  };

  const navigate = useNavigate();
    const navigateToForgotMyPassword = () => {
      navigate('/teacherForgotMyPassword');
    };
  return (

    <div className="authentication">
        <div className ="row">
	<div className="col-md-6 mx-auto p-0">
		<div className="card">
<div className="login-box">
	<div className="login-snip">
		<input id="tab-1" type="radio" name="tab" className="sign-in"/><label htmlFor="tab-1" className="tab">Giriş Yap</label>
		<input id="tab-2" type="radio" name="tab" className="sign-up"/><label htmlFor="tab-2" className="tab">Kaydol</label>
		<div className="login-space">
			<div className="login">
            
       
                <form onSubmit={handleSubmitForLogin}>
                            <div className="group">
                                <label htmlFor="user" className="label">Kullanıcı Adı</label>
                                <input id="user" type="text" className="input"  placeholder="Kullanıcı adını gir" onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Parola</label>
                                <input id="pass" type="password" className="input" data-type="password" placeholder="Şifreni gir" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="group">
                                <input id="check" type="checkbox" className="check" checked/>
                                <label htmlFor="check"><span className="icon"></span> Beni Hatırla</label>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Giriş Yap"/>
                            </div>
                            <div className="hr"></div>
                            <div className="foot">
                                <a href="#" onClick={navigateToForgotMyPassword}>Şifremi Unuttum?</a>
                            </div>

                </form>
                
				
			</div>
            <div className="sign-up-form">
                <form onSubmit={handleSubmitForRegister}>
                            <div className="group">
                                <label htmlFor="user" className="label">Kullanıcı Adı</label>
                                <input id="user" type="text" className="input" placeholder="Kullanıcı adını oluştur" onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Parola</label>
                                <input id="pass" type="password" className="input" data-type="password" placeholder="Şifreni oluştur" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Parola Tekrar</label>
                                <input id="pass" type="password" className="input" data-type="password" placeholder="Şifrenle uyumlu şifreni tekrar gir" onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">İsim Soyisim</label>
                                <input id="pass" type="text" className="input" placeholder="Ad-Soyad" onChange={(e) => setFullname(e.target.value)}/>
                            </div>
                            <div className="group">
                                <label htmlFor="user" className="label">Mail Adresi</label>
                                <input id="user" type="text" className="input" placeholder="Mail adresini yaz" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Kayıt Ol"/>
                            </div>
                            <div className="hr"></div>
                            <div className="foot">
                                <label htmlFor="tab-1">Zaten Üye misin?</label>
                            </div>
                
                </form>

          </div>
			
		</div>
	</div>
</div>   
</div>
</div>
</div>

      
        
      
       
      </div>
   
  );
}
