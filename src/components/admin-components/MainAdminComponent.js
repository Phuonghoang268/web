import { useRouteMatch, Switch, Route, Redirect } from "react-router";
import DashBoard from "./DashboardComponent";
import UserList from "./UserListComponent";

function MainAdmin() {

    let { path, url } = useRouteMatch()
    return (
        <div>
            <Route exact path={`${url}/dashboard`}><DashBoard /></Route>
            <Route exact path={`${url}/users`}><UserList /> </Route>
            
        </div>
    );

}

export default MainAdmin;