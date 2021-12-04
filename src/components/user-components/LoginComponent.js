import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { postLogin } from "../../redux/ActionCreators";
import { connect } from "react-redux";

const required = (val) => val && val.length;

const mapDispatchToProps = dispatch => ({
    postLogin: (username, password) => dispatch(postLogin(username, password)),
});

class Login extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(values) {
        this.props.postLogin(values.username, values.password)
    }

    render() {
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12 col-md-8 offset-2">
                      <h3>Đăng nhập tài khoản</h3>
                      <p>Chào mừng đến với ParkType! Đăng nhập vào tài khoản của bạn!</p>
                    </div>
                    <div className="col-12 col-md-8 offset-2">
                        <LocalForm model="login" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="username" md={2}>Username</Label>
                                <Col md={10}>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="Username"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: 'Bắt buộc'
                                        }}
                                     />
                                </Col>
                            </Row>
                            
                            <Row className="form-group">
                                <Label htmlFor="password" md={2}>Password</Label>
                                <Col md={10}>
                                    <Control model=".password" id="password" name="password"
                                        type="password"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: 'Bắt buộc'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <p>Quên mật khẩu?</p>
                            <Button type="submit" value="submit" color="primary">Đăng nhập</Button>
                            <p>Bạn chưa có tài khoản?</p>
                            <Link to="/register">
                                <Button>Đăng ký</Button>
                            </Link>
                        </LocalForm>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(Login);