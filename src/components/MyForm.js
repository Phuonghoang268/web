
import React, { Component, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BookIcon from '@mui/icons-material/Book';
import NightsStayIcon from '@mui/icons-material/NightsStay';

async function submitToServer(data) {

    try {
        let response = await fetch('http://localhost:8000/parks', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        });
        let responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }

    try {
        var input = document.querySelector('input[type="file"]')
        var data = new FormData()
        data.append('file', input.files[0])
        fetch('http://localhost:8080/images', {
            method: 'POST',
            body: data
        })
    }
    catch (error) {
        console.error(error);
    }

}

const paperStyle = { padding: 20, width: '800px', margin: "20px 20px" }


const submit = ({ name = '', total_space = '', location = '', price = '', hasCamera = '', hasRoof = '', allowOvernight = '', allowBooking = '', description = '' }) => {
    submitToServer({ name, total_space, location, price, hasCamera, hasRoof, allowOvernight, allowBooking, description })
        .then(data => {
            console.log(data);
            window.location.href = '/';
        });

}

const renderField = ({ type, lable, input }) => (
    <span className="input-row">
        <lable>{lable}</lable>
        <input {...input} type={type} placeholder={lable + "*"} />
    </span >
);

const renderCheck = ({ type, lable, input }) => (
    <span className="input-row">
        <input {...input} type={type} />&ensp;
        <lable>{lable}</lable>
    </span >
);

const renderOther = ({ type, lable, input }) => (
    <span className="other">
        <lable>{lable}</lable>
        <input {...input} type={type} placeholder="Other" />
    </span >
);

const UploadAndDisplayImage = ({ lable }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="input-row">
            <lable>{lable}</lable>
            {selectedImage && (
                <div>
                    <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                    <br />
                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
            )}
            <br />

            <br />
            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                }}
            />
        </div>
    );
};

const ContactFormFunc = ({ handleSubmit }) => (


    <form onSubmit={handleSubmit(submit)}>
        <Paper className="form-review" elevation={10} style={paperStyle} >
            <Grid align='center' style={{ color: "purple" }}>
                <h1>Tạo bãi đỗ mới</h1>
            </Grid>

            <Field className="field" name="name" lable='Name' component={renderField} type="text" />
            <br />

            <Field name="image_url" lable='Image' component={UploadAndDisplayImage} type="file" />
            <br />

            <Field name="location" lable='Location' component={renderField} type="text" />
            <br />

            <Field name="price" lable='Price' component={renderField} type="text" />
            <br />
            <Field name="total_space" lable='Total space' component={renderField} type="text" />
            <br />
            <Field name="hasCamera" lable='HasCamera' component={renderCheck} type="checkbox" />
            <VideoCameraBackIcon style={{ top: "200px" }} />
            <br />
            <Field name="hasRoof" lable='HasRoof' component={renderCheck} type="checkbox" />
            <BeachAccessIcon />
            <br />
            <Field name="allowBooking" lable='AllowBooking' component={renderCheck} type="checkbox" />
            <BookIcon />
            <br />
            <Field name="allowOvernight" lable='AllowOvernight' component={renderCheck} type="checkbox" />
            <NightsStayIcon />
            <br />
            <Field name="description" lable='Description' component={renderOther} type="text" />
            <br /><br />
            <label for="submit-form" tabindex="0" style={{ color: "white" }}>Submit</label>
            <input type="submit" href="\" />


        </Paper>
    </form >
);

// Decorate the form component
const ContactForm = reduxForm({
    form: 'contact' // a unique name for this form
})(ContactFormFunc);


export default ContactForm;