import React, { Component,useState,useEffect } from 'react'
import AdminMenuLayout from './admin_menu_layout';
import AdminSidebarLayout from './admin_sidebar_layout';
import axios from "axios";
import { Table } from "react-bootstrap";
import LevelTableRow from "./LevelTableRow";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { Button } from "react-bootstrap";
export default function GetLevelsPage()  {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/levels')
      .then(response => setLevels(response.data))
      .catch(error => console.error(error));
  }, []);
  console.log("Levels Değerleri React");
  console.log(levels);
  const DataTable = () => {
    return levels.map((res, i) => {
      return <LevelTableRow obj={res} key={i} />;
    });
  };
  const navigate = useNavigate();
  const getAllLevels = () => {
    navigate('/addNewLevel');
  };

    return (
        <div>admin main page
        <AdminMenuLayout></AdminMenuLayout>
        <AdminSidebarLayout></AdminSidebarLayout>
        <main id="main" class="main">
          <h2>Kurs Seviyeleri</h2>
          <div className="table-wrapper">
	<Table striped bordered hover>
		<thead>
		<tr>
			<th>Seviye Adı</th>
			<th>Seviye Açıklaması</th>
			<th>Güncelle</th>
      <th>Sil</th>
		
		</tr>
		</thead>
		<tbody>{DataTable()}</tbody>
	</Table>
	</div>
  <Button onClick={getAllLevels} size="sm" variant="success">Yeni Seviye</Button>
        
        

        </main>
      </div>
    )
}
