import React, { Component,useState } from 'react';
import AdminMenuLayout from '../admin_menu_layout';
import AdminSidebarLayout from '../admin_sidebar_layout';
import {Routes, Route, useNavigate} from 'react-router-dom';
export default function AddContentTypePage()  {
  const [type_name, setTypeName] = useState("");
  const navigate = useNavigate();
  const navigateToTypetListPage = () => {
    navigate('/getTypesPage');
  };
  const handleSubmitAddNewType = (e) => {
    e.preventDefault();

      console.log(type_name);
      if(type_name.length!=""){
        
        fetch("http://localhost:5001/add-type", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          type_name,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Type "+data.type_name);
          console.log(data, "addType");
          if (data.status == "ok") {
            alert("Yeni kayıt başarıyla eklendi.");
            navigateToTypetListPage()
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
          <h2>İçerik Tipleri</h2>
        <form onSubmit={handleSubmitAddNewType}>
  <div class="form-group">
    <label for="exampleFormControlInput1">Tip Adı</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Tip Adı" onChange={(e) => setTypeName(e.target.value)}/>
  </div>
  <br></br>
  <button type="submit" class="btn btn-primary">Kaydet</button>
</form>

        </main>
      </div>
  
      )
}
