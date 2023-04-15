import React, { Component,useState } from 'react';
import AdminMenuLayout from '../admin_menu_layout';
import AdminSidebarLayout from '../admin_sidebar_layout';
import {Routes, Route, useNavigate} from 'react-router-dom';
export default function AddLevelsPage()  {
  const [level_title, setLevelTitle] = useState("");
  const [level_description, setLevelDescription] = useState("");
  const navigate = useNavigate();
  const navigateToLevelListPage = () => {
    navigate('/getLevelsPage');
  };
  const handleSubmitAddNewLevel = (e) => {
    e.preventDefault();

      console.log(level_title, level_description);
      if(level_title.length!="" || level_description.length!=""){
        
        fetch("http://localhost:27017/add-level", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          level_title,
          level_description
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Level title "+data.level_title);
          console.log(data, "addLevel");
          if (data.status == "ok") {
            alert("Yeni kayıt başarıyla eklendi.");
            navigateToLevelListPage();
           
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
          <h2>Kurs Seviyeleri</h2>
        <form onSubmit={handleSubmitAddNewLevel}>
  <div class="form-group">
    <label for="exampleFormControlInput1">Seviye</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Grade-1 ..." onChange={(e) => setLevelTitle(e.target.value)}/>
  </div>

  <div class="form-group">
    <label for="exampleFormControlTextarea1">Açıklama</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setLevelDescription(e.target.value)}></textarea>
  </div>
  <br></br>
  <button type="submit" class="btn btn-primary">Kaydet</button>
</form>

        </main>
      </div>
  
      )
}
