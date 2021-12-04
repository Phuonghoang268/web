import { right } from "@popperjs/core";
import Button from '@mui/material/Button';


const ParkList = ({ parks, name, location }) => {
    return (
        <div className="row">
            {parks.map(park => (
                <div className="park-preview" key={park.id} >
                    <h2 >{park.name}</h2>
                    <h4> {park.location}</h4>
                    <Button Button variant="outlined" color="success" style={{ float: right }} href="/Review">Đánh giá</Button>
                    <Button Button variant="outlined" color="success" style={{ float: right, margin: "0 20px 0 0" }} href="/Edit">Chỉnh sửa</Button>
                    <Button Button variant="outlined" color="success" style={{ float: right, margin: "0  20px" }} href="/InforWatching">Xem</Button>
                </div>
            ))
            }
        </div >
    );
}

export default ParkList;
