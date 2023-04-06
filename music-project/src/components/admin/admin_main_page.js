import React, { Component } from 'react';
import AdminMenuLayout from './admin_menu_layout';
import AdminSidebarLayout from './admin_sidebar_layout';
export default function AdminMainPage()  {
 
    return (
      <div>admin main page
        <AdminMenuLayout></AdminMenuLayout>
        <AdminSidebarLayout></AdminSidebarLayout>
        <main id="main" class="main">
          
        </main>
      </div>
  
      )
}
