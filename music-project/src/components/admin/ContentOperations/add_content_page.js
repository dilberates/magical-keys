import React, { Component,useState,useEffect } from 'react';
import AdminMenuLayout from '../admin_menu_layout';
import AdminSidebarLayout from '../admin_sidebar_layout';
import {Routes, Route, useNavigate} from 'react-router-dom';
import axios from "axios";
export default function AddContentPage()  {
  const [content_title, setContentTitle] = useState("");
  const [content_description, setContentDescription] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:27017/content-levels')
      .then(res => {
        setOptions(res.data);
        console.log(options);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSubmitAddNewContent = (e) => {
    console.log("Buraya girdi1")
    e.preventDefault();
    setSelectedValue(e.target.value);

    console.log("Seçili değer");
    console.log(selectedValue);

    if(content_title.length!="" || content_description.length!=""){
        
        fetch("http://localhost:27017/add-new-content", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          content_title,
          content_description,
          selectedValue

        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Content title "+data.content_title);
          console.log("Level title "+data.selectedValue);
          console.log(data, "addLevel");
          if (data.status == "ok") {
            alert("Yeni kayıt başarıyla eklendi.");
            navigateToContentListPage();
           
          } else {
            alert("Something went wrong");
          }
        });

      }
      else{
        alert("Alanlar boş geçilemez!");
      }
  }
  const navigate = useNavigate();
  const navigateToContentListPage = () => {
  navigate('/getContentsPage');
};
 
    return (
      <div>admin main page
        <AdminMenuLayout></AdminMenuLayout>
        <AdminSidebarLayout></AdminSidebarLayout>
        <main id="main" class="main">
          <h2>Kurs İçerikleri</h2>
        <form onSubmit={handleSubmitAddNewContent}>
  <div class="form-group">
    <label for="exampleFormControlInput1">İçerik Adı</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Grade-1 ..." onChange={(e) => setContentTitle(e.target.value)}/>
  </div>

  <div class="form-group">
    <label for="exampleFormControlTextarea1">Açıklama</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setContentDescription(e.target.value)}></textarea>
  </div>
  <br>
  </br>
  <br></br>
  <div class="form-group">
    <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} class="form-control">
        <option value="">Seçiniz</option>
        {options.map(option => (
            <option key={option._id} value={option._id}>{option.level_title}</option>
        ))}
    </select>

  </div>
  <br></br>
  <button type="submit" class="btn btn-primary">Kaydet</button>
</form>

        </main>
      </div>
  
      )
}
