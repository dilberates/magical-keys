import React, { Component,useState,useEffect } from 'react';
import AdminMenuLayout from '../admin_menu_layout';
import AdminSidebarLayout from '../admin_sidebar_layout';
import {Routes, Route, useNavigate} from 'react-router-dom';
import axios from "axios";
export default function AddSubContentPage()  {
  const [sub_content_title, setSubContentTitle] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5001/sub-content-types')
      .then(res => {
        setOptions(res.data);
        console.log(options);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios.get('http://localhost:5001/content-levels')
      .then(res => {
        setOptions2(res.data);
        console.log(options);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const handleSubmitAddNewSubContent = (e) => {
    console.log("Buraya girdi1")
    e.preventDefault();
    setSelectedValue(e.target.value);

    console.log("Seçili değer");
    console.log(selectedValue);

    if(sub_content_title.length!="" ){
        
        fetch("http://localhost:5001/add-new-sub-content", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          sub_content_title,
          selectedValue,
          selectedValue2,

        }),
      })
        .then((res) => res.json())
        .then((data) => {
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
  navigate('/getSubContentsPage');
};
 
    return (
      <div>admin main page
        <AdminMenuLayout></AdminMenuLayout>
        <AdminSidebarLayout></AdminSidebarLayout>
        <main id="main" class="main">
          <h2>İçerikler</h2>
        <form onSubmit={handleSubmitAddNewSubContent}>
  <div class="form-group">
    <label for="exampleFormControlInput1">İçerik Adı</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Grade-1 ..." onChange={(e) => setSubContentTitle(e.target.value)}/>
  </div>
  <br>
  </br>
  <br></br>
  <h3>Tipi</h3>
  <br></br>
  <div class="form-group">
    <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} class="form-control">
    <option value="">Seçiniz</option>
        {options.map(option => (
            <option key={option._id} value={option._id}>{option.type_name}</option>
        ))}
    </select>
    <br></br>
  <h3>Seviyesi</h3>
  <br></br>
  </div>
  <div class="form-group">
    <select value={selectedValue2} onChange={(e) => setSelectedValue2(e.target.value)} class="form-control">
    <option value="">Seçiniz</option>
        {options2.map(option => (
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
