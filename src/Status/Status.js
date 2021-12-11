import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { Grid, Paper } from '@material-ui/core';
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import { useParams } from 'react-router-dom';
import { Booklist } from './BookListComponent';

export const Status = () => {

    const [park, setpark] = useState(null)
    const { id } = useParams();

    const paperStyle = { padding: 20, width: '850px', margin: "20px 20px" }

    useEffect(() => {
        fetch('http://localhost:8000/owner/parks/status/' + id)
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
                <h1>Quản lý bãi đỗ </h1>
                &emsp;
            </Grid>
            <Paper className="form-review" elevation={10} style={paperStyle} >
                {park && (
                    <div>
                        <h1>{park.name}</h1>
                        <h2> Tổng số chỗ trong bãi đỗ: {park.total_space}</h2>
                        <h2>Số xe hiện tại: </h2>
                    </div>

                )}
            </Paper>
            <Paper className="form-review" elevation={10} style={paperStyle} >
                <Booklist />
            </Paper>




            <Footer />
        </div >
    );
}



