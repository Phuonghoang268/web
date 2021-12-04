import { useEffect, useState } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BookIcon from '@mui/icons-material/Book';
import NightsStayIcon from '@mui/icons-material/NightsStay';


const paperStyle = { padding: 20, height: '130vh', width: '800px', margin: "20px 20px" }

const renderField = ({ type, lable, input }) => (
    <span className="input-row">
        <lable>{lable}</lable>
        <input {...input} type={type} />
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

const ContactFormFunc = () => {
    const [parks, setparks] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8000/parks')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setparks(data);
            });
    }, []);


    return (

        <form initialValues={{ name: "Sherlynn" }}>
            <Paper className="form-review" elevation={10} style={paperStyle} >
                <Grid align='center' style={{ color: "purple" }}>
                    <h1>Thông tin bãi đỗ</h1>
                </Grid>

                <Field className="name" name="name" lable='Name' component={renderField} type="text" />
                <br />

                <Field name="image_url" lable='Image' component={renderField} type="file" />
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
            </Paper>
        </form >
    );
}

// Decorate the form component
const InforWatching = reduxForm({
    form: 'InforWatching' // a unique name for this form
})(ContactFormFunc);

export default InforWatching;