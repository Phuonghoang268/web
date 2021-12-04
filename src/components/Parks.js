import { useEffect, useState } from "react";
import Parklist from "./Parklist";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { useHistory, Link } from 'react-router-dom';
import { Button } from "reactstrap";
import { Grid, Paper } from '@material-ui/core'


const Parks = () => {
    const [parks, setparks] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8000/parks')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setparks(data);
            });
    }, []);
    const paperStyle = {
        padding: 20, width: '1200px', margin: "40px 10px "
    }
    const paperStylet = {
        height: '100vh', margin: "40px "
    }
    return (
        <div className="home">
            <Header />
            <Grid container spacing={2}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center' style={{ color: "purple" }}>
                        <h1>Danh sách bãi đỗ</h1>
                    </Grid>
                    <Button variant="contained" color="success">
                        <Link to="/Main" style={{ color: "white" }}>Thêm bãi đỗ</Link>
                    </Button>
                    <br></br>
                    <br></br><br></br>
                    {parks && <Parklist parks={parks} title="Tất cả bãi đỗ xe của bạn" />}
                </Paper>
                <Paper elevation={10} style={paperStylet}>


                </Paper>
            </Grid>
            <Footer />
        </div>
    );
}

export default Parks;

