import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { Grid, Paper } from '@material-ui/core';
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { right } from "@popperjs/core";
import StarIcon from '@material-ui/icons/Star';

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

            </Grid>
            {park && (
                <div className='rating'>
                    <h1> Xếp hạng và đánh giá</h1>
                    <table cellspacing="0" cellpadding="0">
                        <tr >
                            <td style={{ fontSize: "100px" }} >
                                {park.avg_rating}

                            </td>
                            <td>
                                <div >
                                    <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                                    <div class="progress" style={{ width: "500px" }}>
                                        <div class="progress-bar bg-success" style={{ width: `${park.rating_five}` / `${park.total_rating}` * 100 + "%" }} role="progressbar" ></div>
                                    </div>
                                </div>
                                <StarIcon /><StarIcon /><StarIcon /><StarIcon />
                                <div class="progress" style={{ width: "500px" }}>
                                    <div class="progress-bar bg-success" style={{ width: `${park.rating_four}` / `${park.total_rating}` * 100 + "%" }} role="progressbar" ></div>
                                </div>
                                <StarIcon /><StarIcon /><StarIcon />
                                <div class="progress" style={{ width: "500px" }}>
                                    <div class="progress-bar bg-success" style={{ width: `${park.rating_three}` / `${park.total_rating}` * 100 + "%" }} role="progressbar" ></div>
                                </div>
                                <StarIcon /><StarIcon />
                                <div class="progress" style={{ width: "500px" }}>
                                    <div class="progress-bar bg-success" style={{ width: `${park.rating_two}` / `${park.total_rating}` * 100 + "%" }} role="progressbar" ></div>
                                </div>
                                <StarIcon />
                                <div class="progress" style={{ width: "500px" }}>
                                    <div class="progress-bar bg-success" style={{ width: `${park.rating_one}` / `${park.total_rating}` * 100 + "%" }} role="progressbar" ></div>
                                </div>
                                <div style={{ float: right }}>
                                    {park.total_rating} đánh giá
                                </div>
                            </td>
                        </tr>

                    </table>
                    <br />
                    <h1>Bình luận của khách hàng </h1>


                    {park.comment.map((data, index) => (
                        <table>
                            <td>
                                <div key={index}>
                                    <p style={{ fontSize: "25px" }}>{data.name}</p>
                                    <p><Rating name="size-small" defaultValue={data.rating} size="small" /></p>
                                    <p style={{ fontSize: "20px" }}>{data.content}</p>
                                </div>
                            </td>
                        </table>

                    ))}

                </div>

            )
            }
            <Footer />
        </div >
    );
}



