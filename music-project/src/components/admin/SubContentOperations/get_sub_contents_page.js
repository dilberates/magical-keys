import React, { Component,useState,useEffect } from 'react'
import AdminMenuLayout from '../admin_menu_layout';
import AdminSidebarLayout from '../admin_sidebar_layout';
import axios from "axios";
import { Alert, Table } from "react-bootstrap";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";
export default function GetSubContentsPage()  {
  const [subContents, setSubContents] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5001/subContents')
      .then(response => setSubContents(response.data))
      .catch(error => console.error(error));
  }, []);
  console.log("Sub Contents Değerleri React");
  console.log(subContents);



  const navigate = useNavigate();
  const addNewContent= () => {
    navigate('/addNewSubContent');
  };
const navigateToSubContentListPage = () => {
  navigate('/getSubContentsPage');
};
function deleteContent(id) {
    axios.delete(`http://localhost:27017/delete-content/${id}`)
      .then(response => {
        console.log(response.data);
        alert("Başarıyla silindi.");
        navigate('/getSubContentsPage');

        // do something after delete
      })
      .catch(error => console.log(error));
  }

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
			
            <th>Alt içerik Adı</th>
            <th>Kurs Adı</th>
            <th>Açıklama</th>
            <th>Türü</th>
    
		
            <th>Sil</th>
		
		</tr>
		</thead>
		<tbody>
                {subContents.map(subContent => (
            <tr key={subContent._id}>
                 <td>{subContent.sub_content_title}</td>
                <td>{subContent.content_id.content_title}</td>
                <td>{subContent.sub_content_description}</td>
                <td>{subContent.type_id.type_name}</td>
                <td><Button size="sm" variant="danger" onClick={() => deleteContent(subContent._id)}>Sil</Button></td>
            </tr>
            ))}
        </tbody>
	</Table>
	</div>
  <Button onClick={addNewContent} size="sm" variant="success">Yeni Alt İçerik</Button>
        </main>
      </div>
    )
}
