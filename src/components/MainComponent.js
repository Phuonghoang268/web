import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import MainAdmin from "./admin-components/MainAdminComponent";
import MainUser from "./user-components/MainUserComponent";

class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/admin"><MainAdmin /></Route>
                    <Route path="/user"><MainUser /></Route>
                    <Redirect to="/admin" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Main);