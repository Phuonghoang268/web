import { useEffect, useState } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Button } from "reactstrap";
import { Grid, Paper } from '@material-ui/core'
import { fetchParks } from "../redux/ActionCreators"
import { right } from "@popperjs/core";

import { connect } from "react-redux";

const ParkList = ({ parks }) => {
    return (
        <div className="row">

            {parks.map((park) => (
                <div className="park-preview" key={park.id} >
                    <h2 >{park.name}</h2>
                    <h4> {park.location}</h4>
                    <Button variant="outlined" color="success" style={{ float: right }} href={`/Delete/${park.id}`}>Xóa</Button>
                    <Button variant="outlined" color="success" style={{ float: right, margin: "0 20px 0 0" }} href="/Review">Đánh giá</Button>
                    <Button variant="outlined" color="success" style={{ float: right, margin: "0 20px 0 0" }} href={`/Edit/${park.id}`}>Chỉnh sửa</Button>
                    <Button color="success" style={{ float: right, margin: "0  20px" }} href={`/InforWatching/${park.id}`}>Xem</Button>
                </div>
            ))
            }
        </div >
    );
}

const mapStateToProps = state => {
    return {
        parks: state.parks,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchParks: () => dispatch(fetchParks())
});

const Parks = (props) => {

    useEffect(() => {
        props.fetchParks()
    }, []);
    const paperStyle = {
        padding: 20, width: '1200px', margin: "40px 10px "
    }
    return (
        <div className="home">
            <Header />
            <Grid container spacing={2}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center' style={{ color: "purple" }}>
                        <h1>Danh sách bãi đỗ</h1>
                    </Grid>
                    <Button variant="contained" color="success" href="/Main">Thêm bãi đỗ
                    </Button>
                    <br></br><br></br><br></br>
                    {props.parks.parks && <ParkList parks={props.parks.parks} title="Tất cả bãi đỗ xe của bạn" />}
                </Paper>
            </Grid>
            <Footer />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Parks);

