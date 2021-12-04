import { Button, Grid, styled, Paper, CircularProgress } from "@mui/material";
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function RenderOpenTime({ isOpen, openTime }) {
    if (isOpen) {
        return (
            <div>Đang mở cửa: {openTime}</div>
        );
    } else {
        return (
            <div style={{ color: "red" }}>Đã đóng cửa: {openTime}</div>
        );
    }
}

function RenderParkStatus({ park_status }) {
    if (park_status != null) {
        return (
            <div style={{marginLeft: "-20px"}}>
                <Grid container rowSpacing={3} columnSpacing={2}>
                    <Grid item xs={4}>
                        <Item>
                            <h4><i class="fas fa-clock"></i></h4>
                            <p>Tổng thời gian</p>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <h4><i class="fas fa-dollar-sign"></i> {park_status.price}</h4>
                            <p>Thành tiền</p>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <h4><i class="fas fa-route"></i> {park_status.distance}</h4>
                            <p>Khoảng cách</p>
                        </Item>
                    </Grid>
                    <div style={{ margin: "18px 0px 0px 20px" }}><i class="fas fa-map-marker-alt"></i> {park_status.location}</div>
                    <div style={{ margin: "10px 0px 0px 20px", display: "flex" }}>
                        <i style={{ margin: "2px 3px 0px 0px" }} class="far fa-clock"></i>
                        <RenderOpenTime isOpen={park_status.isOpen} openTime={park_status.openTime} />
                    </div>
                    <Grid item xs={7}>
                        <Item>Sức chứa</Item>
                    </Grid>
                    <Grid item xs={5}>
                        <Item>{park_status.totalSpace}</Item>
                    </Grid>
                    <Grid item xs={7}>
                        <Item>Số chỗ trống</Item>
                    </Grid>
                    <Grid item xs={5}>
                        <Item>{park_status.totalFreeSpace}</Item>
                    </Grid>
                </Grid>
                <div className="col offset-4" style={{ marginTop: "20px" }} >
                    <Button variant="contained" color="success">Đặt chỗ</Button>
                </div>
            </div>
        );
    }
}

const ParkStatus = (props) => {
    if (props.isLoading) {
        return (
            <div>
                <CircularProgress color="success" />
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div>
                <h4>{props.errMess}</h4>
            </div>
        );
    }
    else if (props.park_status != null) {
        return (
            <RenderParkStatus park_status={props.park_status.park_status} />
        );
    }
}

export default ParkStatus;