import React, { Component,useState,useEffect } from 'react'
import AdminMenuLayout from '../admin_menu_layout';
import AdminSidebarLayout from '../admin_sidebar_layout';
import axios from "axios";
import { Alert, Table } from "react-bootstrap";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { Button } from "react-bootstrap";
import ContentTableRow from "./ContentTableRow";
import { Link } from "react-router-dom";
export default function GetContentsPage()  {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/contents')
      .then(response => setContents(response.data))
      .catch(error => console.error(error));
  }, []);
  console.log("Contents Değerleri React");
  console.log(contents);



  const navigate = useNavigate();
  const addNewContent= () => {
    navigate('/addNewContent');
  };
const navigateToContentListPage = () => {
  navigate('/getContentsPage');
};
function deleteContent(id) {
    axios.delete(`http://localhost:5000/delete-content/${id}`)
      .then(response => {
        console.log(response.data);
        alert("Başarıyla silindi.");
        navigate('/getContentsPage');

        // do something after delete
      })
      .catch(error => console.log(error));
  }

  function updateContent(id,data) {
    axios.put(`http://localhost:5000/update-content/${id}`,data)
      .then(response => {
        console.log(response.data);
        alert("Başarıyla silindi.");
        navigate('/getContentsPage');

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
			
            <th>Kurs Adı</th>
            <th>Kurs Tanımı</th>
            <th>Seviye</th>
			<th>Güncelle</th>
            <th>Sil</th>
		
		</tr>
		</thead>
		<tbody>
                {contents.map(content => (
            <tr key={content._id}>
                <td>{content.content_title}</td>
                <td>{content.content_description}</td>
                <td>{content.level_id.level_title}</td>
                <td><Button size="sm" variant="danger" onClick={() => deleteContent(content._id)}>Sil</Button></td>
	
    <td><Button size="sm" variant="warning" onClick={() => updateContent(content)}>Güncelle</Button></td>
	
                
            </tr>
            ))}
        </tbody>
	</Table>
	</div>
  <Button onClick={addNewContent} size="sm" variant="success">Yeni Seviye</Button>
        </main>
      </div>
    )
}
