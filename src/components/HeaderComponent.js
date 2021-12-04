import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import {
    NavItem, NavbarToggler, Nav, Collapse, Navbar,
    NavbarBrand, Button
} from "reactstrap";


class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false
        }
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            <>
                <Navbar expand="lg" style={{ backgroundColor: '#CEE5D0' }}>
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className="app-name ms-auto" href="/">Park Type</NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav className="ms-auto" navbar>
                            <NavItem>
                                <NavLink style={{ color: '#3E7C17' }} className="nav-link" to="/">
                                    <strong>Nav Example</strong>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ color: '#3E7C17' }} className="nav-link" to="/">
                                    <strong>Nav Example</strong>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ color: '#3E7C17' }} className="nav-link" to="/">
                                    <strong>Nav Example</strong>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ color: '#3E7C17' }} className="nav-link" to="/">
                                    <strong>Nav Example</strong>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <Link to='/login'>
                                    <Button outline>
                                        <span className="fa fa-sign-in fa-lg"></span> Đăng nhập
                                    </Button>
                                </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </>
        );
    }

}

export default Header;