import React, { Component } from "react";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ContactForm from "./MyForm";
import 'bootstrap/dist/css/bootstrap.min.css';

class Main extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Header />
                <ContactForm />
                <Footer />
            </div>
        );
    }
}

export default Main;