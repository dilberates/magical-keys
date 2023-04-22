import React, { Component } from 'react'
import "../../css/vendor/boxicons/css/boxicons.min.css";
import "../../css/vendor/quill/quill.snow.css";
import "../../css/vendor/quill/quill.bubble.css";
import "../../css/vendor/remixicon/remixicon.css";
import "../../css/vendor/simple-datatables/style.css";
import "../../css/studentlessonspage.css";
import "../../js/main.js";

export default function StudentSidebarLayout() {
    return (
        <div>
           
  <aside id="sidebar" className="sidebar sidebarSpecial">

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

  



 

      

    </ul>

  </aside>
        </div>
      )
}
