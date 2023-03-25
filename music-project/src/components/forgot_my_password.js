import React, { Component } from 'react'
import "../../src/css/forgotmypassword.css"//harici css dahil etme
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
export default function ForgotMyPassword() {
    const navigate = useNavigate();
    const navigateToMainPage = () => {
      navigate('/index');
    };
    return (
        <div className="authentication ">
             <div class="container d-flex flex-column forgotPasswordAlign">
      <div class="row align-items-center justify-content-center
          min-vh-100">
        <div class="col-12 col-md-8 col-lg-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="mb-4">
                <h5>Şifreni mi unuttun?</h5>
                <p class="mb-2">Hemen sistemde kayıtlı mail adresini ve şifreni mail adresine gelen talimatlara göre şifreni sıfırla...
                </p>
              </div>
              <form>
                <div class="mb-3">
                  <label for="email" class="form-label">Mail Adresi</label>
                  <input type="email" id="email" class="form-control" name="email" placeholder="Sistemde kayıtlı mail adresini gir"
                    required=""/>
                </div>
                <div class="mb-3 d-grid">
                  <button type="submit" class="btn btn-primary">
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
