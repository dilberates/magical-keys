import React, { Component,useState,useEffect } from 'react'
import AdminMenuLayout from '../admin_menu_layout';
import AdminSidebarLayout from '../admin_sidebar_layout';
import axios from "axios";
import { Alert, Table } from "react-bootstrap";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function GetSongsPage()  {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5001/songs')
      .then(response => setSongs(response.data))
      .catch(error => console.error(error));
  }, []);
  console.log("Songs Değerleri React");
  console.log(songs);



  const navigate = useNavigate();
  const addNewSong= () => {
    navigate('/addNewSong');
  };



    return (
        <div>admin main page
        <AdminMenuLayout></AdminMenuLayout>
        <AdminSidebarLayout></AdminSidebarLayout>
        <main id="main" class="main">
          <h2>Şarkılar</h2>

          <div className="table-wrapper">
	<Table striped bordered hover>
		<thead>
		<tr>
            <th>Şarkı Adı</th>
            <th>Şarkı Açıklaması</th>
         
		
		</tr>
		</thead>
		<tbody>
                {songs.map(song => (
            <tr key={song._id}>
                <td>{song.song_name}</td>
                <td>{song.song_description}</td>
                

            </tr>
            ))}
        </tbody>
	</Table>
	</div>
  <Button onClick={addNewSong} size="sm" variant="success">Yeni Şarkı</Button>
        </main>
      </div>
    )
}
