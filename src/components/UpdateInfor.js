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


const paperStyle = { padding: 20, width: '800px', margin: "20px 20px" }

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

const renderTime = ({ type, lable, input }) => (
    <span className="input-row" name="timeoc">
        <lable>{lable}</lable>
        <br />
        <input {...input} type={type} placeholder={lable + "*"} />
    </span >
);

async function submitToServer(data) {

    try {
        let response = await fetch('http://localhost:8000/parks/', {
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

}



const submit = ({ name = '', total_space = '', location = '', price = '', hasCamera = '', hasRoof = '', allowOvernight = '', allowBooking = '', description = '' }) => {


    submitToServer({ name, total_space, location, price, hasCamera, hasRoof, allowOvernight, allowBooking, description })
        .then(data => {
            console.log(data);
            window.location.href = '/';
        });

}

const ContactFormFunc = ({ handleSubmit }) => {
    const { id } = useParams();
    const [park, setpark] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8000/owner/parks/info/' + id)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data)
                setpark(data);
            });
    }, []);


    const [isRenderTime, setIsRenderTime] = useState(true);
    const changeTime = () => {
        setIsRenderTime(!isRenderTime);
    }

    return (

        <form onSubmit={handleSubmit(submit)}>
            {park && (
                <Paper className="form-review" elevation={10} style={paperStyle} >
                    <Grid align='center' style={{ color: "purple" }}>
                        <h1>Chỉnh sửa thông tin bãi đỗ {park.name}</h1>
                    </Grid>

                    <Field name="name" lable='Name' component={renderField} type="text" format={value => value === " " ? `${park.name}` : value} />
                    <br />

                    <Field name="image_url" lable='Image' component={renderField} type="text" format={value => value === " " ? `${park.image_url}` : value} />
                    <br />

                    <Field name="location" lable='Location' component={renderField} type="text" format={value => value === " " ? `${park.location}` : value} />
                    <br />

                    <Field name="allow24h" lable='Allow24h' component={renderCheck} type="checkbox" format={value => value === " " ? `${park.allow24h}` : value} onChange={e => changeTime()} />
                    <br />
                    {!`${park.allow24h}` == isRenderTime &&
                        <Field name="open_time" lable='Open_time' component={renderTime} type="time" format={value => value === " " ? `${park.open_time}` : value} />
                    }
                    <br />
                    {!`${park.allow24h}` == isRenderTime &&
                        <Field name="close_time" lable='Close_time' component={renderTime} type="time" format={value => value === " " ? `${park.close_time}` : value} />
                    }
                    <br />


                    <Field name="price" lable='Price' component={renderField} type="text" format={value => value === " " ? `${park.price}` : value} />
                    <br />
                    <Field name="total_space" lable='Total space' component={renderField} type="text" format={value => value === " " ? `${park.total_space}` : value} />
                    <br />
                    <Field name="hasCamera" lable='HasCamera' component={renderCheck} type="checkbox" format={value => value === " " ? `${park.hasCamera}` : value} />
                    <VideoCameraBackIcon style={{ top: "200px" }} />
                    <br />
                    <Field name="hasRoof" lable='HasRoof' component={renderCheck} type="checkbox" format={value => value === " " ? `${park.hasRoof}` : value} />
                    <BeachAccessIcon />
                    <br />
                    <Field name="allowBooking" lable='AllowBooking' component={renderCheck} type="checkbox" format={value => value === " " ? `${park.allowBooking}` : value} />
                    <BookIcon />
                    <br />
                    <Field name="allowOvernight" lable='AllowOvernight' component={renderCheck} type="checkbox" format={value => value === " " ? `${park.allowOvernight}` : value} />
                    <NightsStayIcon />
                    <br />
                    <Field name="description" lable='Description' component={renderOther} type="text" format={value => value === " " ? `${park.description}` : value} />
                    <br /><br />
                    <label for="submit-form" tabindex="0" style={{ color: "white" }}>Submit</label>
                    <input type="submit" href="\" />
                </Paper>
            )}
        </form >
    );
}

// Decorate the form component
const UpdateInfor = reduxForm({
    form: 'InforWatching', // a unique name for this form
    initialValues: { name: " ", image_url: " ", location: " ", price: " ", total_space: " ", hasCamera: " ", hasRoof: " ", allowBooking: " ", allowOvernight: " ", description: " ", allow24h: " ", open_time: " ", close_time: " " }
})(ContactFormFunc);

export default UpdateInfor;