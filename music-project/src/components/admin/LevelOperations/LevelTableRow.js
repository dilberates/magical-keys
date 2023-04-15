import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';
const LevelTableRow = (props) => {
const { _id, level_title, level_description, level_status } = props.obj;
const navigate = useNavigate();
const navigateToLevelListPage = () => {
  navigate('/getLevelsPage');
};

const deleteLevel = () => {
	axios
	.delete(
"http://localhost:27017/delete-level/" + _id)
	.then((res) => {
		console.log("id:"+_id);
		if (res.status === 200) {
		alert("Student successfully deleted");
		navigateToLevelListPage();

		window.location.reload();
		} else Promise.reject();
	})
	.catch((err) => alert("Something went wrong"));
};

return (
	<tr>
	<td>{level_title}</td>
	<td>{level_description}</td>
	<td><Button variant="warning" size="sm"><Link
		to={"/edit-level/" + _id}>
		Edit
		</Link></Button></td>
	<td>
		<Button onClick={deleteLevel}
		size="sm" variant="danger">
		Delete
		</Button>
	</td>
	</tr>
);
};

export default LevelTableRow;
