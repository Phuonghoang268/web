import React, { useEffect, useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BookIcon from '@mui/icons-material/Book';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
const Form = () => {
    const [name, setName] = useState('');
    const [total_space, setTotalspace] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [hasCamera, setCamera] = useState('');
    const [hasRoof, setRoof] = useState('');
    const [allowOvernight, setOverNight] = useState('');
    const [allowBooking, setBook] = useState('');
    const [description, setDes] = useState('');
    const [image_url, setImage] = useState('');
    const history = useHistory();

    const paperStyle = { padding: 20, height: '120vh', width: '800px', margin: "20px 20px" }
    const btnstyle = { margin: '8px 0' }

    const handleSubmit = (e) => {
        e.preventDefault()
        const park = { name, total_space, location, price, hasCamera, hasRoof, allowOvernight, allowBooking, description, image_url };
        fetch('http://localhost:8000/parks', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(park)
        }).then(() => {
            console.log("new")
            history.go(-1)
        })

    }
    return (
        <form onSubmit={handleSubmit}>
            <Paper className="form-review" elevation={10} style={paperStyle} >
                <Grid align='center' style={{ color: "purple" }}>
                    <h1>Tạo bãi đỗ mới</h1>
                </Grid>
                <h2> Tên bãi đỗ</h2>
                <TextField value={name} onChange={(e) => setName(e.target.value)} label='Name' placeholder='Tên bãi đỗ' fullWidth required />
                <input type="file" value={image_url} onChange={(e) => setImage(e.target.value)} />
                <h2> Địa chỉ </h2>
                <TextField value={location} onChange={(e) => setLocation(e.target.value)} label='Address' placeholder='Địa chỉ' fullWidth required />
                <h2> Bảng giá </h2>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Gia tien" style={{ borderRadius: '8px' }}></input> VNĐ
                <h2> Sức chứa </h2>
                <input value={total_space} onChange={(e) => setTotalspace(e.target.value)} type="text" placeholder="So xe" style={{ borderRadius: '8px' }}></input> XE
                <h2> Các thông số khác </h2>
                <div style={{ fontSize: "20px" }}>
                    <Input type="checkbox" value={hasCamera} onChange={(e) => setCamera(e.target.checked.toString())} /> Camera &ensp;
                    <VideoCameraBackIcon style={{ top: "200px" }} />
                    <br></br>
                    <Input type="checkbox" value={hasRoof} onChange={(e) => setRoof(e.target.checked.toString())} /> Mái che  &ensp;
                    <BeachAccessIcon />
                    <br></br>
                    <Input type="checkbox" value={allowBooking} onChange={(e) => setBook(e.target.checked.toString())} /> Đặt chỗ  &ensp;
                    <BookIcon />
                    <br></br>
                    <Input type="checkbox" value={allowOvernight} onChange={(e) => setOverNight(e.target.checked.toString())} /> Qua đêm  &ensp;
                    <NightsStayIcon />
                </div>
                <h2> Mô tả </h2>
                <TextField value={description} onChange={(e) => setDes(e.target.value)} label='Description' placeholder='Mô tả' fullWidth required />
                <br></br><br></br><br></br><br></br><br></br><br></br>
                <button >Tạo</button>
            </Paper>
        </form >
    )
}

export default Form


// import React, { Component, useState } from 'react';
// import { Field, reduxForm } from 'redux-form';
// import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
// import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
// import BeachAccessIcon from '@mui/icons-material/BeachAccess';
// import BookIcon from '@mui/icons-material/Book';
// import NightsStayIcon from '@mui/icons-material/NightsStay';

// async function submitToServer(data) {

//     try {
//         let response = await fetch('http://localhost:8000/parks', {
//             method: 'POST',
//             headers: { "Content-type": "application/json" },
//             body: JSON.stringify(data)
//         });
//         let responseJson = await response.json();
//         return responseJson;
//     }
//     catch (error) {
//         console.error(error);
//     }

// }
// const paperStyle = { padding: 20, width: '800px', margin: "20px 20px" }


// const submit = ({ name = '', total_space = '', location = '', price = '', hasCamera = '', hasRoof = '', allowOvernight = '', allowBooking = '', description = '', image_url = '' }) => {
//     submitToServer({ name, total_space, location, price, hasCamera, hasRoof, allowOvernight, allowBooking, description, image_url })
//         .then(data => {
//             console.log(data);
//             window.location.href = '/';
//         });
// }

// const renderField = ({ type, lable, input }) => (
//     <span className="input-row">
//         <lable>{lable}</lable>
//         <input {...input} type={type} placeholder={lable + "*"} />
//     </span >
// );

// const renderCheck = ({ type, lable, input }) => (
//     <span className="input-row">
//         <input {...input} type={type} />&ensp;
//         <lable>{lable}</lable>
//     </span >
// );

// const renderOther = ({ type, lable, input }) => (
//     <span className="other">
//         <lable>{lable}</lable>
//         <input {...input} type={type} placeholder="Other" />
//     </span >
// );

// const UploadAndDisplayImage = ({ lable }) => {
//     const [selectedImage, setSelectedImage] = useState(null);

//     return (
//         <div className="input-row">
//             <lable>{lable}</lable>
//             {selectedImage && (
//                 <div>
//                     <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
//                     <br />
//                     <button onClick={() => setSelectedImage(null)}>Remove</button>
//                 </div>
//             )}
//             <br />

//             <br />
//             <input
//                 type="file"
//                 name="myImage"
//                 onChange={(event) => {
//                     console.log(event.target.files[0]);
//                     setSelectedImage(event.target.files[0]);
//                 }}
//             />
//         </div>
//     );
// };

// const ContactFormFunc = ({ handleSubmit }) => (


//     <form onSubmit={handleSubmit(submit)}>
//         <Paper className="form-review" elevation={10} style={paperStyle} >
//             <Grid align='center' style={{ color: "purple" }}>
//                 <h1>Tạo bãi đỗ mới</h1>
//             </Grid>

//             <Field className="field" name="name" lable='Name' component={renderField} type="text" />
//             <br />

//             <Field name="image_url" lable='Image' component={UploadAndDisplayImage} type="file" />
//             <br />

//             <Field name="location" lable='Location' component={renderField} type="text" />
//             <br />

//             <Field name="price" lable='Price' component={renderField} type="text" />
//             <br />
//             <Field name="total_space" lable='Total space' component={renderField} type="text" />
//             <br />
//             <Field name="hasCamera" lable='HasCamera' component={renderCheck} type="checkbox" />
//             <VideoCameraBackIcon style={{ top: "200px" }} />
//             <br />
//             <Field name="hasRoof" lable='HasRoof' component={renderCheck} type="checkbox" />
//             <BeachAccessIcon />
//             <br />
//             <Field name="allowBooking" lable='AllowBooking' component={renderCheck} type="checkbox" />
//             <BookIcon />
//             <br />
//             <Field name="allowOvernight" lable='AllowOvernight' component={renderCheck} type="checkbox" />
//             <NightsStayIcon />
//             <br />
//             <Field name="description" lable='Description' component={renderOther} type="text" />
//             <br /><br />
//             <label for="submit-form" tabindex="0" style={{ color: "white" }}>Submit</label>
//             <input type="submit" href="\" />


//         </Paper>
//     </form >
// );

// // Decorate the form component
// const ContactForm = reduxForm({
//     form: 'contact' // a unique name for this form
// })(ContactFormFunc);


// export default ContactForm;