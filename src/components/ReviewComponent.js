import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { Grid, Paper } from '@material-ui/core';
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import StarIcon from '@material-ui/icons/Star';
import { Bar } from 'react-chartjs-2';

export const Review = () => {

    const [park, setpark] = useState(null)
    const { id } = useParams();


    useEffect(() => {
        fetch('http://localhost:8000/owner/parks/rating/' + id)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setpark(data);
            });
    }, []);

    return (
        < div className='book-advance' >
            <Header />
            <Grid align='center' style={{ color: "purple" }}>
                <h1>Đánh giá của khách hàng</h1>
                <br />
            </Grid>
            {park && (
                <div className='chart'>

                </div>
            )}
            <Footer />
        </div >
    );
}



