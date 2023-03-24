import React, { Component } from 'react';
import "../../css/loginregister.css"//harici css dahil etme


export default class TeacherAuthenticationPage extends Component {
  
  render() {
    return (
      <div className="authentication">
        <div class ="row">
	<div class="col-md-6 mx-auto p-0">
		<div class="card">
<div class="login-box">
	<div class="login-snip">
		<input id="tab-1" type="radio" name="tab" class="sign-in" checked/><label for="tab-1" class="tab">Giriş Yap</label>
		<input id="tab-2" type="radio" name="tab" class="sign-up"/><label for="tab-2" class="tab">Kaydol</label>
		<div class="login-space">
			<div class="login">
				<div class="group">
					<label for="user" class="label">Kullanıcı Adı</label>
					<input id="user" type="text" class="input"  placeholder="Kullanıcı adını gir"/>
				</div>
				<div class="group">
					<label for="pass" class="label">Parola</label>
					<input id="pass" type="password" class="input" data-type="password" placeholder="Şifreni gir"/>
				</div>
				<div class="group">
					<input id="check" type="checkbox" class="check" checked/>
					<label for="check"><span class="icon"></span> Beni Hatırla</label>
				</div>
				<div class="group">
					<input type="submit" class="button" value="Giriş Yap"/>
				</div>
				<div class="hr"></div>
				<div class="foot">
					<a href="#">Şifremi Unuttum?</a>
				</div>
			</div>
			<div class="sign-up-form">
				<div class="group">
					<label for="user" class="label">Kullanıcı Adı</label>
					<input id="user" type="text" class="input" placeholder="Kullanıcı adını oluştur"/>
				</div>
				<div class="group">
					<label for="pass" class="label">Parola</label>
					<input id="pass" type="password" class="input" data-type="password" placeholder="Şifreni oluştur"/>
				</div>
				<div class="group">
					<label for="pass" class="label">Parola Tekrar</label>
					<input id="pass" type="password" class="input" data-type="password" placeholder="Şifrenle uyumlu şifreni tekrar gir"/>
				</div>
				<div class="group">
					<label for="pass" class="label">Mail Adresi</label>
					<input id="pass" type="text" class="input" placeholder="Mail adresini gir"/>
				</div>
				<div class="group">
					<input type="submit" class="button" value="Kayıt Ol"/>
				</div>
				<div class="hr"></div>
				<div class="foot">
					<label for="tab-1">Zaten Üye misin?</label>
				</div>
			</div>
		</div>
	</div>
</div>   
</div>
</div>
</div>

      
        
      
       
      </div>
      
    )
  }
}
