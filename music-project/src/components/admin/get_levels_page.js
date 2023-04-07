import React, { Component,useState } from 'react'
import AdminMenuLayout from './admin_menu_layout';
import AdminSidebarLayout from './admin_sidebar_layout';
export default function GetLevelsPage()  {
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
