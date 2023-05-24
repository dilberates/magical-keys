// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import TypeForm from "./TypeForm";
const EditTypePage = (props) => {


console.log(props.obj);
const [formValues, setFormValues] = useState({
	type_name: "",
});
console.log(props);
	
//onSubmit handler
const onSubmit = (typeObject) => {
	console.log("Type Object")
	console.log(typeObject);
	axios
	.put(
		"http://localhost:5001/update-type/" +
		props.match.params.id,
		typeObject
	)
	.then((res) => {
		if (res.status === 200) {
		alert("Type successfully updated");
		props.history.push("/getTypesPage");
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
		"http://localhost:27017/update-types/"
		+ props.match.params.id
	)
	.then((res) => {
		const { type_name} = res.data;
		setFormValues({ type_name});
	})
	.catch((err) => console.log(err));
}, []);

//return Level Form
return (
	<TypeForm
	initialValues={formValues}
	onSubmit={onSubmit}
	enableReinitialize
	>
	Tip Güncelleme
	</TypeForm>
);
};


