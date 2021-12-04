import { List, ListItem, ListItemIcon, ListItemText, Box, Divider } from "@mui/material";
import { useHistory, useRouteMatch } from "react-router-dom";

function DashBoard() {
    let { path, url } = useRouteMatch()
    const history = useHistory();
    return (
        <>
            <Box sx={{ width: 200 }} role="presentation">
                <List>
                    <ListItem button onClick={()=> history.push("/")}>
                        <ListItemIcon>
                            <i class="fas fa-home"></i>
                        </ListItemIcon>
                        <ListItemText primary="DashBoard" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={()=> history.push("/admin/users")}>
                        <ListItemIcon>
                            <i class="fas fa-users"></i>
                        </ListItemIcon>
                        <ListItemText primary="Người dùng" />
                    </ListItem>
                    <ListItem button onClick={()=> history.push("/powner")}>
                        <ListItemIcon>
                            <i class="fas fa-id-card"></i>
                        </ListItemIcon>
                        <ListItemText primary="Chủ bãi đỗ" />
                    </ListItem>
                    <ListItem button onClick={()=> history.push("/parks")}>
                        <ListItemIcon>
                            <i class="fas fa-parking"></i>
                        </ListItemIcon>
                        <ListItemText primary="Bãi đỗ" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={()=> history.push("/setting")}>
                        <ListItemIcon>
                            <i class="fas fa-cogs"></i>
                        </ListItemIcon>
                        <ListItemText primary="Cài đặt" />
                    </ListItem>
                </List>
            </Box>
        </>
    );
}
export default DashBoard;