import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';
const ContentTableRow = (props) => {
const { _id, content_title, content_description, content_status,level_title } = props.obj;
const navigate = useNavigate();
const navigateToContentListPage = () => {
  navigate('/getContentsPage');
};

const deleteContent = () => {
	axios
	.delete(
"http://localhost:5001/delete-content/" + _id)
	.then((res) => {
		console.log("id:"+_id);
		if (res.status === 200) {
		alert("Student successfully deleted");
		navigateToContentListPage();

		window.location.reload();
		} else Promise.reject();
	})
	.catch((err) => alert("Something went wrong"));
};

return (
	<tr>
	<td>{content_title}</td>
	<td>{content_description}</td>
    <td>{content_status}</td>
    <td>{level_title}</td>
	<td><Button variant="warning" size="sm"><Link
		to={"/edit-content/" + _id}>
		Edit
		</Link></Button></td>
	<td>
		<Button onClick={deleteContent}
		size="sm" variant="danger">
		Delete
		</Button>
	</td>
	</tr>
);
};

export default ContentTableRow;
