import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";

const TypeForm = (props) => {
const validationSchema = Yup.object().shape({
	type_name: Yup.string().required("Required"),
});
console.log(props);
return (
	<div className="form-wrapper">
	<Formik {...props} validationSchema={validationSchema}>
		<Form>
		<FormGroup>
			<Field name="type_name" type="text"
				className="form-control" />
			<ErrorMessage
			name="type_name"
			className="d-block invalid-feedback"
			component="span"
			/>
		</FormGroup>

		<Button variant="danger" size="lg"
			block="block" type="submit">
			{props.children}
		</Button>
		</Form>
	</Formik>
	</div>
);
};

export default TypeForm;
