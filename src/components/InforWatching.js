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
import { useParams } from 'react-router-dom';


const paperStyle = { padding: 20, height: '130vh', width: '800px', margin: "20px 20px" }

function changeTime() {
    // Get the checkbox
    var checkBox = document.getElementById("24time");
    // Get the output text
    var text = document.getElementsByName("timeoc");

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true) {

        for (var i = 0; i < text.length; i += 1) {
            text[i].style.display = 'inline';
        }

    } else {
        for (var i = 0; i < text.length; i += 1) {
            text[i].style.display = 'inline';
        }
    }
}

const renderField = ({ type, lable, input }) => (
    <span className="input-row">
        <lable>{lable}</lable>
        <input {...input} type={type} readOnly />
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
        <input {...input} type={type} placeholder="Other" readOnly />
    </span >
);


const renderTime = ({ type, lable, input }) => {
    return (
        <span className="input-row" name="timeoc">
            <lable>{lable}</lable>
            <br />
            <input {...input} type={type} placeholder={lable + "*"} />
        </span >
    );
};

const ContactFormFunc = () => {
    const { id } = useParams();
    const [park, setpark] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8000/parks/' + id)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data)
                setpark(data);
            });
    }, []);


    return (

        <form >
            {park && (
                <Paper className="form-review" elevation={10} style={paperStyle} >
                    <Grid align='center' style={{ color: "purple" }}>
                        <h1>Thông tin bãi đỗ {park.name}</h1>
                    </Grid>

                    <Field name="name" lable='Name' component={renderField} type="text" format={value => value = `${park.name}`} />
                    <br />

                    <Field name="image_url" lable='Image' component={renderField} type="text" format={value => value = `${park.image_url}`} />
                    <br />

                    <Field name="location" lable='Location' component={renderField} type="text" format={value => value = `${park.location}`} />
                    <br />
                    <Field name="allow24h" lable='Allow24h' component={renderCheck} type="checkbox" format={value => value = `${park.allow24h}`} />
                    <br />

                    <Field name="open_time" lable='Open_time' component={renderTime} type="time" format={value => value = `${park.open_time}`} />
                    <br />

                    <Field name="close_time" lable='Close_time' component={renderTime} type="time" format={value => value = `${park.close_time}`} />
                    <br />

                    <Field name="price" lable='Price' component={renderField} type="text" format={value => value = `${park.price}`} />
                    <br />
                    <Field name="total_space" lable='Total space' component={renderField} type="text" format={value => value = `${park.total_space}`} />
                    <br />
                    <Field name="hasCamera" lable='HasCamera' component={renderCheck} type="checkbox" format={value => value = `${park.hasCamera}`} />
                    <VideoCameraBackIcon style={{ top: "200px" }} />
                    <br />
                    <Field name="hasRoof" lable='HasRoof' component={renderCheck} type="checkbox" format={value => value = `${park.hasRoof}`} />
                    <BeachAccessIcon />
                    <br />
                    <Field name="allowBooking" lable='AllowBooking' component={renderCheck} type="checkbox" format={value => value = `${park.allowBooking}`} />
                    <BookIcon />
                    <br />
                    <Field name="allowOvernight" lable='AllowOvernight' component={renderCheck} type="checkbox" format={value => value = `${park.allowOvernight}`} />
                    <NightsStayIcon />
                    <br />
                    <Field name="description" lable='Description' component={renderOther} type="text" format={value => value = `${park.description}`} />
                    <br /><br />
                </Paper>
            )}
        </form >
    );
}

// Decorate the form component
const InforWatching = reduxForm({
    form: 'InforWatching', // a unique name for this form
})(ContactFormFunc);

export default InforWatching;