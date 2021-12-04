import React, { Component } from "react";
import { Label, Form, Row, Input, Col, Button } from "reactstrap";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

class Start extends Component {

    constructor(props) {
        super(props);
        this.state = { address: '' };
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    render() {
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="title">
                        <h2>Chào mừng bạn đến với Park Type</h2>
                        <p>Tìm và đặt trước bãi đỗ xe chỉ với vài thao tác đơn giản</p>
                    </div>
                    <Form>
                        <Row className="form-group">
                            <Label for='location' md={2}>Vị trí</Label>
                            <Col md={6}>
                                <PlacesAutocomplete
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    onSelect={this.handleSelect}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <input
                                                {...getInputProps({
                                                    placeholder: 'Vị trí gửi xe',
                                                    className: 'location-search-input',
                                                })}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map(suggestion => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label for="entrance-time" md={2}>Thời gian gửi</Label>
                            <Col md={3}>
                                <Input id="entrance-date" name="entrance-time" type="date" />
                            </Col>
                            <Col md={3}>
                                <Input id="entrance-time" name="entrance-time" type="time" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label for="exit-time" md={2}>Thời gian trả</Label>
                            <Col md={3}>
                                <Input id="exit-date" name="exit-time" type="date" />
                            </Col>
                            <Col md={3}>
                                <Input id="exit-time" name="exit-time" type="time" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{ size: 3, offset: 3 }}>
                                <Button type="submit" color="success">
                                    Tìm kiếm
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Start;