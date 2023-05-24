// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import LevelForm from "./LevelForm";
const EditLevelPage = (props) => {


console.log(props.obj);
const [formValues, setFormValues] = useState({
	level_title: "",
	level_description: "",
});
console.log(props);
	
//onSubmit handler
const onSubmit = (levelObject) => {
	console.log("Level Object")
	console.log(levelObject);
	axios
	.put(
		"http://localhost:5001/update-level/" +
		props.match.params.id,
		levelObject
	)
	.then((res) => {
		if (res.status === 200) {
		alert("Level successfully updated");
		props.history.push("/getLevelsPage");
		} else Promise.reject();
	})
	.catch((err) => alert("Something went wrong"));
};

// Load data from server and reinitialize level form
useEffect(() => {
	console.log("Güncellenecek Değerler")
	console.log(props.match.params);
	axios
	.get(
		"http://localhost:27017/update-level/"
		+ props.match.params.id
	)
	.then((res) => {
		const { level_title,level_description} = res.data;
		setFormValues({ level_title, level_description});
	})
	.catch((err) => console.log(err));
}, []);

//return Level Form
return (
	<LevelForm
	initialValues={formValues}
	onSubmit={onSubmit}
	enableReinitialize
	>
	Seviye Güncelleme
	</LevelForm>
);
};


export default EditLevelPage;
