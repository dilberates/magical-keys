import React, { Component,useState } from 'react';
import AdminMenuLayout from './admin_menu_layout';
import AdminSidebarLayout from './admin_sidebar_layout';
import {Routes, Route, useNavigate} from 'react-router-dom';
import AddLevelsPage from './add_levels_page';
export default function AdminMainPage()  {
  

 
    return (
      <div>admin main page
        <AdminMenuLayout></AdminMenuLayout>
        <AdminSidebarLayout></AdminSidebarLayout>
        <AddLevelsPage></AddLevelsPage>
      </div>
  
      )
}
