import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { Grid, Paper, Button } from '@material-ui/core';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BookIcon from '@mui/icons-material/Book';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { right } from "@popperjs/core";


const paperStyle = { padding: 20, width: '800px', margin: "20px 20px" }


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
        setIsRenderTime(isRenderTime);
    }

    return (
        <div>
            <Header />
            <Paper className="form-review" elevation={10} style={paperStyle} >

                {park && (
                    <div>
                        <Grid align='center' style={{ color: "purple" }}>
                            <h1>Thông tin bãi đỗ {park.name} </h1>
                            <br />
                        </Grid>
                        <form >
                            <Button variant="outlined" color="success" style={{ float: right, margin: "0 20px 0 0" }} href={`/Update/${park.id}`}>Chỉnh sửa thông tin</Button>
                            <br />
                            <Field name="name" lable='Name' component={renderField} type="text" format={value => value = `${park.name}`} />
                            <br />

                            <Field name="image_url" lable='Image' component={renderField} type="text" format={value => value = `${park.image_url}`} />
                            <br />

                            <Field name="location" lable='Location' component={renderField} type="text" format={value => value = `${park.location}`} />
                            <br />
                            {`${park.allow24h}` &&
                                <Field name="allow24h" lable='Allow24h' component={renderCheck} type="checkbox" format={value => value = `${park.allow24h}`} />
                            }
                            <br />
                            {!`${park.allow24h}` &&
                                <Field name="open_time" lable='Open_time' component={renderTime} type="time" format={value => value = `${park.open_time}`} />
                            }
                            <br />

                            {!`${park.allow24h}` &&
                                <Field name="close_time" lable='Close_time' component={renderTime} type="time" format={value => value = `${park.close_time}`} />
                            }
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
                        </form >
                    </div>

                )}

            </Paper>
            <Footer />
        </div>
    );
}

// Decorate the form component
const InforWatching = reduxForm({
    form: 'InforWatching', // a unique name for this form
})(ContactFormFunc);

export default InforWatching;