import React, { Component,useState,useEffect } from 'react'
import AdminMenuLayout from '../admin_menu_layout';
import AdminSidebarLayout from '../admin_sidebar_layout';
import axios from "axios";
import { Alert, Table } from "react-bootstrap";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { Button } from "react-bootstrap";
import ContentTableRow from "./ContentTableRow";
import { Link } from "react-router-dom";
export default function GetSubContentsPage()  {
  const [contents, setContents] = useState([]);

  const [editingContent, setEditingContent] = useState(null);
  const [formData, setFormData] = useState({ content_title: '', content_description: '',level_id:'' });

  useEffect(() => {
    axios.get('http://localhost:5001/contents')
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
    axios.delete(`http://localhost:27017/delete-content/${id}`)
      .then(response => {
        console.log(response.data);
        alert("Başarıyla silindi.");
        navigate('/getContentsPage');

        // do something after delete
      })
      .catch(error => console.log(error));
  }


  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateContent(editingContent._id, formData);
  };

  const handleEditClick = (content) => {
    setEditingContent(content);
    setFormData({ content_title: content.content_title, content_description: content.content_description, level_id:content.level_id });
  };

  const handleCancelClick = () => {
    setEditingContent(null);
    setFormData({ content_title: '', content_description: '' });
  };

  function updateContent(id,updatedData) {
    axios.put(`http://localhost:27017/update-content/${id}`,updateContent)
      .then(response => {
        console.log(response.data);
        setContents(contents.map(content => content._id === response.data._id ? response.data : content));
        setEditingContent(null);
        setFormData({ content_title: '', content_description: '' });
        alert("Başarıyla güncellendi.");
        navigate('/getContentsPage');

      })
      .catch(error => console.log(error));
  }
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5001/content-levels')
      .then(res => {
        setOptions(res.data);
        console.log(options);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);



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
                <td>
                {editingContent && editingContent._id === content._id ? (
                  <>
                    <form onSubmit={handleSubmit}>
                      <input type="text" name="content_title" value={formData.content_title} onChange={handleInputChange} />
                      <br></br>
                      <br></br>
                   
                      <input type="text" name="content_description" value={formData.content_description} onChange={handleInputChange} />
                      <br></br>
                      <br></br>
                    
                      <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} class="form-control">
        <option value="">Seçiniz</option>
        {options.map(option => (
            <option key={option._id} value={option._id}>{option.level_title}</option>

        ))}
    </select>
    <br></br>
                      <button type="submit">İçeriği Güncelle</button>
                      <button type="button" onClick={handleCancelClick}>İptal</button>
                    </form>
                  </>
                ) : (
                  <>
                    <Button type="button" onClick={() => handleEditClick(content)} size="sm" variant="warning">Güncelle</Button>
                  </>
                )}
              </td>
	
	
                
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
