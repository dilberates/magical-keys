import React, { Component } from 'react'
import "../../css/vendor/boxicons/css/boxicons.min.css";
import "../../css/vendor/quill/quill.snow.css";
import "../../css/vendor/quill/quill.bubble.css";
import "../../css/vendor/remixicon/remixicon.css";
import "../../css/vendor/simple-datatables/style.css";
import "../../css/vendor/style.css";
import "../../js/main.js";

export default function AdminSidebarLayout() {
    return (
        <div>
           
  <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">

      <li className="nav-item">
        <a className="nav-link " href="index.html">
          <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="http://localhost:3000/getLevelsPage">
          <i className="bi bi-menu-button-wide"></i><span>Seviyeler</span>
        </a>
       
      </li>
   

      <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="http://localhost:3000/getContentsPage">
          <i className="bi bi-journal-text"></i><span>Kurslar</span>
        </a>
     
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="http://localhost:3000/getTypesPage">
          <i className="bi bi-signpost"></i><span>İçerik Tipleri</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="http://localhost:3000/getContentsPage">
          <i className="bi bi-collection"></i><span>İçerikler</span>
        </a>
     
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="http://localhost:3000/getContentsPage">
          <i className="bi bi-signpost-split"></i><span>Alt İçerikler</span>
        </a>
     
      </li>

  



 

      

    </ul>

  </aside>
        </div>
      )
}
