import React from "react";
import { Rating, CardMedia, CardContent, Box, Card, ButtonBase, CircularProgress } from "@mui/material";
import { baseUrl } from '../../shared/baseUrl';
import { Media, } from "reactstrap";


function RenderParkCard({ park, selectedPark, setSelectedPark }) {
    const handleSelect = (id) => {
        setSelectedPark(id);
    }
    return (
        <div>
            <Card sx={{ display: 'flex' }}>
                <ButtonBase
                    style={{ textAlign: "initial", width: "100%", height: "100%" }}
                    onClick={() => handleSelect(park.id)} >
                    <CardMedia
                        component="img"
                        sx={{ width: 150 }}
                        image={baseUrl + park.image}
                        alt={park.name} />
                    <Box>
                        <CardContent>
                            <h5>{park.name}</h5>
                            <Box sx={{ display: 'flex' }}>
                                <Rating size="small" name="rating" value={park.rate} precision={0.1} readOnly />
                                <Box sx={{ ml: 1 }}>({park.numOfRate})</Box>
                            </Box>
                            <Box sx={{ display: 'flex' }} style={{ marginTop: "10px" }}>
                                <div>
                                    <h5><i class="fas fa-dollar-sign"></i> {park.price}</h5>
                                </div>
                                <div style={{ marginLeft: "20px" }}>
                                    <h5><i class="fas fa-route"></i> {park.distance}</h5>
                                </div>
                            </Box>
                        </CardContent>
                    </Box>
                </ButtonBase>
            </Card>
        </div >
    );
}

export const ParkList = (props) => {
    const { selectedPark, setSelectedPark } = props;
    if (props.isLoading) {
        return (
            <div className="container">
                <CircularProgress color="success" />
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className='container'>
                <h4>{props.errMess}</h4>
            </div>
        );
    } else {
        return (
            <div className="container">
                <Media list>
                    {props.parks.parks.map((park) => {
                        return (
                            <div key={park.id} style={{ margin: "15px 0px 0px -70px" }}>
                                <RenderParkCard park={park} selectedPark={selectedPark} setSelectedPark={setSelectedPark} />
                            </div>
                        );
                    })}
                </Media>
            </div>
        );
    }
}