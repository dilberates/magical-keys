import React, { Component,useState} from 'react'
import "../../css/forgotmypassword.css"//harici css dahil etme
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
export default function StudentForgotMyPassword() {

  const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const navigateToMainPage = () => {
      navigate('/index');
    };
    
    function handleSubmitForForgotMyPassword(e) {
      e.preventDefault();
  
      console.log(email);
      fetch("http://localhost:27017/forgot-password-student", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("hello")
          
          console.log(data.status, "userRegister");
          if (data.status == "ok") {
            alert("Hesaba giriş yapabileceğiniz geçici şifreniz mail adresinize gönderilmiştir.");

            window.location.href = "/authenticationPage";
          }
          else{
            alert("Mail gönderme işlemi başarısız!");
          }
        });
    }
    
    return (
        <div className="authentication ">
             <div className="container d-flex flex-column forgotPasswordAlign">
      <div className="row align-items-center justify-content-center
          min-vh-100">
        <div className="col-12 col-md-8 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="mb-4">
                <h5>Şifreni mi unuttun?</h5>
                <p className="mb-2">Hemen sistemde kayıtlı mail adresini ve şifreni mail adresine gelen talimatlara göre şifreni sıfırla...
                </p>
              </div>
              <form onSubmit={handleSubmitForForgotMyPassword}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Mail Adresi</label>
                  <input type="email" id="email" class="form-control" name="email" placeholder="Sistemde kayıtlı mail adresini gir"
                    required="" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3 d-grid">
                  <button type="submit" className="btn btn-primary">
                    Şifreni Sıfırla
                  </button>
                </div>
                <span>Henüz bir hesabın yok mu? <a href="" onClick={navigateToMainPage}>Hemen kaydol</a></span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>


            
        </div>
    )
  
}
