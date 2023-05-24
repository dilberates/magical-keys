import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';
const TypeTableRow = (props) => {
const { _id, type_name,type_status } = props.obj;
const navigate = useNavigate();
const navigateToTypeListPage = () => {
  navigate('/getTypesPage');
};

const deleteType = () => {
	axios
	.delete(
"http://localhost:5001/delete-type/" + _id)
	.then((res) => {
		console.log("id:"+_id);
		if (res.status === 200) {
		alert("Student successfully deleted");
		navigateToTypeListPage();

		window.location.reload();
		} else Promise.reject();
	})
	.catch((err) => alert("Something went wrong"));
};

return (
	<tr>
	<td>{type_name}</td>
	<td><Button variant="warning" size="sm"><Link
		to={"/edit-type/" + _id}>
		Edit
		</Link></Button></td>
	<td>
		<Button onClick={deleteType}
		size="sm" variant="danger">
		Delete
		</Button>
	</td>
	</tr>
);
};

export default TypeTableRow;
