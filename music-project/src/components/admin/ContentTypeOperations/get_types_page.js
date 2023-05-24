import React, { Component,useState,useEffect } from 'react'
import AdminMenuLayout from '../admin_menu_layout';
import AdminSidebarLayout from '../admin_sidebar_layout';
import axios from "axios";
import { Table } from "react-bootstrap";
import TypeTableRow from "./TypeTableRow";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { Button } from "react-bootstrap";
export default function GetTypesPage()  {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/types')
      .then(response => setTypes(response.data))
      .catch(error => console.error(error));
  }, []);
  console.log("Types Değerleri React");
  console.log(types);
  const DataTable = () => {
    return types.map((res, i) => {
      return <TypeTableRow obj={res} key={i} />;
    });
  };
  const navigate = useNavigate();
  const getAllTypes = () => {
    navigate('/addNewTypes');
  };

    return (
        <div>admin main page
        <AdminMenuLayout></AdminMenuLayout>
        <AdminSidebarLayout></AdminSidebarLayout>
        <main id="main" class="main">
          <h2>İçerik Tipleri</h2>
          <div className="table-wrapper">
	<Table striped bordered hover>
		<thead>
		<tr>
			<th>Tip Adı</th>
			<th>Güncelle</th>
      <th>Sil</th>
		
		</tr>
		</thead>
		<tbody>{DataTable()}</tbody>
	</Table>
	</div>
  <Button onClick={getAllTypes} size="sm" variant="success">Yeni Tip</Button>
        </main>
      </div>
    )
}
