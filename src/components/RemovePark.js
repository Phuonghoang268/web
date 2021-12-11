import { useEffect, useState } from "react";
import React, { Component } from 'react';
import { useParams, useHistory } from 'react-router-dom';

export const RemovePark = () => {
    const { id } = useParams();
    const [park, setpark] = useState(null);
    const history = useHistory();

    useEffect(() => {
        fetch('http://localhost:8000/owner/parks/info/' + id, {
            method: 'DELETE',
            credentials: "include",
        })

            .then(res => res.text())
            .then(res => console.log(res))
            .then(history.go(-1))
    }, []);

    return (

        <div></div>
    );
}


