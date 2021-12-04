import ParkListTabs from "./ParkListComponent";
import Start from "./StartComponent";
import { useRouteMatch, Switch, Route, Redirect } from "react-router";
import Login from './LoginComponent';
import Register from './SignupComponent';
import SearchInfo from "./SearchInfoComponent";

function MainUser() {
    let { path, url } = useRouteMatch()
    return (
        <div>
            <Switch>
                <Route exact path={`${url}/start`}><Start /></Route>
                <Route exact path={`${url}/parks`}>
                    <SearchInfo />
                    <ParkListTabs />
                </Route>
                <Route exact path={`${url}/login`}><Login /></Route>
                <Route exact path={`${url}/register`}><Register /></Route>
                <Redirect to={`${url}/start`} />
            </Switch>
        </div>
    );
}

export default MainUser;