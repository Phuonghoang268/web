import { useEffect, useState } from "react";
import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

const RemovePark = () => {
    const { id } = useParams();
    const [park, setpark] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8000/parks/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))
            .then(window.location.href = '/')
    }, []);


    return (

        <div></div>
    );
}


export default RemovePark;