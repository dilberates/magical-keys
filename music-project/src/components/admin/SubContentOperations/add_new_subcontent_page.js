import React, { Component,useState,useEffect } from 'react';
import AdminMenuLayout from '../admin_menu_layout';
import AdminSidebarLayout from '../admin_sidebar_layout';
import {Routes, Route, useNavigate} from 'react-router-dom';
import axios from "axios";
export default function AddSubContentPage()  {
  const [sub_content_title, setSubContentTitle] = useState("");
  const [sub_content_description, setSubContentDescription] = useState("");
  const [sub_content_image, setSubContentImage] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  const [selectedContentType, setSelectedContentType] = useState("");
  const [contentOptions, setContentOptions] = useState([]);
  const [contentTypeOptions, setContentTypeOptions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5001/subcontent-contents')
      .then(res => {
        setContentOptions(res.data);
        console.log(contentOptions);
      })
      .catch(err => {
        console.log(err);
      });
      axios.get('http://localhost:5001/sub-content-types')
      .then(res => {
        setContentTypeOptions(res.data);
        console.log(contentTypeOptions);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSubmitAddNewSubContent = (e) => {
    console.log("Buraya girdi1")
    e.preventDefault();
    //setSelectedValue(e.target.value);

    //console.log("Seçili değer");
    //console.log(selectedValue);

    console.log("Seçili content : "+selectedContent);
    console.log("Seçili contentype : "+selectedContentType);
    if(sub_content_title.length!="" || sub_content_description.length!=""){
        
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
          sub_content_description,
          sub_content_image,
          selectedContent,
          selectedContentType

        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Sub Content title "+data.sub_content_title);
          console.log("Content title "+data.selectedContent);
          console.log("Content Type title "+data.selectedContentType);
          console.log(data, "addSubContent");
          if (data.status == "ok") {
            alert("Yeni kayıt başarıyla eklendi.");
            navigateToSubContentListPage();
           
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
  const navigateToSubContentListPage = () => {
  navigate('/getSubContentsPage');
};
 
    return (
      <div>admin main page
        <AdminMenuLayout></AdminMenuLayout>
        <AdminSidebarLayout></AdminSidebarLayout>
        <main id="main" class="main">
          <h2>Kurs İçerikleri</h2>
        <form onSubmit={handleSubmitAddNewSubContent}>
  <div class="form-group">
    <label for="exampleFormControlInput1">Alt İçerik Adı</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Alt içerik adı..." onChange={(e) => setSubContentTitle(e.target.value)}/>
  </div>

  <div class="form-group">
    <label for="exampleFormControlTextarea1">Açıklama</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setSubContentDescription(e.target.value)}></textarea>
  </div>
  <br>
  </br>
  <br></br>
  <div class="form-group">
    <label for="exampleFormControlInput1">İçerik Görseli</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Görsel" onChange={(e) => setSubContentImage(e.target.value)}/>
  </div>
  <br></br>
  <br></br>
  <div class="form-group">
    <select value={selectedContent} onChange={(e) => setSelectedContent(e.target.value)} class="form-control">
        <option value="">Seçiniz</option>
        {contentOptions.map(option => (
            <option key={option._id} value={option._id}>{option.content_title}</option>
        ))}
    </select>

  </div>
  <br></br>
  <div class="form-group">
    <select value={selectedContent} onChange={(e) => setSelectedContentType(e.target.value)} class="form-control">
        <option value="">Seçiniz</option>
        {contentTypeOptions.map(option => (
            <option key={option._id} value={option._id}>{option.type_name}</option>
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
