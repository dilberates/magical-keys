import React, { Component,useState } from 'react';
import AdminMenuLayout from '../admin_menu_layout';
import AdminSidebarLayout from '../admin_sidebar_layout';
import {Routes, Route, useNavigate} from 'react-router-dom';
export default function AddSongsPage()  {
  const [song_name, setSongTitle] = useState("");
  const [song_description, setSongDescription] = useState("");
  const [song_image, setSongImage] = useState("");
  const navigate = useNavigate();
  const navigateToSongListPage = () => {
    navigate('/getSongPage');
  };
  const handleSubmitAddNewSong = (e) => {
    e.preventDefault();

      console.log(song_name, song_description);
      if(song_name.length!="" || song_description.length!=""){
        
        fetch("http://localhost:5001/add-song", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          song_name,
          song_description,
          song_image
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Song name "+data.song_name);
          console.log(data, "addSong");
          if (data.status == "ok") {
            alert("Yeni kayıt başarıyla eklendi.");
            navigateToSongListPage();
           
          } else {
            alert("Something went wrong");
          }
        });

      }
      else{
        alert("Alanlar boş geçilemez!");
      }
      
  };

 
    return (
      <div>admin main page
        <AdminMenuLayout></AdminMenuLayout>
        <AdminSidebarLayout></AdminSidebarLayout>
        <main id="main" class="main">
          <h2>Kurs Şarkıları</h2>
        <form onSubmit={handleSubmitAddNewSong}>
  <div class="form-group">
    <label for="exampleFormControlInput1">Şarkı</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Caddelerde Rüzgar ..." onChange={(e) => setSongTitle(e.target.value)}/>
  </div>

  <div class="form-group">
    <label for="exampleFormControlTextarea1">Açıklama</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setSongDescription(e.target.value)}></textarea>
  </div>
  <br></br>
  <div class="form-group">
    <label for="exampleFormControlInput1">Görsel</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Görsel" onChange={(e) => setSongImage(e.target.value)}/>
  </div>
  <br>
  </br>
  <button type="submit" class="btn btn-primary">Kaydet</button>
</form>

        </main>
      </div>
  
      )
}
