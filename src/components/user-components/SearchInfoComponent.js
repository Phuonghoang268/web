import { Component } from "react";
import { FormGroup, Form, Row, Col, Label, Input, Button } from "reactstrap";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';


class SearchInfo extends Component {

    constructor(props) {
        super(props)

        this.state = { address: '' };
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = addr => {
        geocodeByAddress(addr)
            .then(results => getLatLng(results[0]))
            .then(latLng => {this.center = latLng;})
            .catch(error => console.error('Error', error));
        this.setState({ address: addr });
    };

    render() {
        return (
            <div style={{ margin: "5px 20px" }}>
                <Form>
                    <Row className="form-group">
                        <Col md={2}>
                            <FormGroup>
                                <div>
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
                                </div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Row>
                                    <Col md={7}>
                                        <Input id="entrance-date" name="entrance-time" type="date" />
                                    </Col>
                                    <Col md={5}>
                                        <Input id="entrance-time" name="entrance-time" type="time" />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Row>
                                    <Col md={7}>
                                        <Input id="exit-date" name="exit-time" type="date" />
                                    </Col>
                                    <Col md={5}>
                                        <Input id="exit-time" name="exit-time" type="time" />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <Button type="submit" color="success">
                                Tìm kiếm
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default SearchInfo;