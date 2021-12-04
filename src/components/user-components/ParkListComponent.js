import React, { useEffect } from "react";
import { AppBar, Tabs, styled, Paper } from "@mui/material";
import { Media, Row, Col } from "reactstrap";
import { useTheme } from "@emotion/react";
import { Tab } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import ParkDetail from "./ParkDetailComponent";
import {
    fetchComments, fetchParkInfo, postComment, fetchParkStatus, postReport, fetchBestParks,
    fetchCheapParks, fetchNearParks
} from "../../redux/ActionCreators";
import { connect } from "react-redux";
import { ParkList } from "./RenderParkListComponent";
import Map from "./Map";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other} >
            {value === index && (
                <div>{children}</div>
            )}
        </div>
    );
}

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'Nunito',
    '&:hover': {
        color: '#3E7C17',
        opacity: 1,
        fontWeight: "Bold",
    },
    '&.Mui-selected': {
        color: '#3E7C17',
        fontWeight: "Bolder",
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },
}));

function allyProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const mapStateToProps = state => {
    return {
        best_parks: state.best_parks,
        cheap_parks: state.cheap_parks,
        near_parks: state.near_parks,
        park_status: state.park_status,
        park_info: state.park_info,
        comments: state.comments,
    }
}

const mapDispatchToProps = dispatch => ({
    postComment: (park_id, rating, comment) => dispatch(postComment(park_id, rating, comment)),
    postReport: (park_id, content) => dispatch(postReport(park_id, content)),
    fetchBestParks: () => dispatch(fetchBestParks()),
    fetchCheapParks: () => dispatch(fetchCheapParks()),
    fetchNearParks: () => dispatch(fetchNearParks()),
    fetchParkStatus: (park_id) => { dispatch(fetchParkStatus(park_id)) },
    fetchParkInfo: (park_id) => { dispatch(fetchParkInfo(park_id)) },
    fetchComments: (park_id) => { dispatch(fetchComments(park_id)) }
});

function ParkListTabs(props) {

    // const [lat, lng] = props;
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [selectedPark, setSelectedPark] = React.useState(-1);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleChangeIndex = (index) => {
        setValue(index);
    }

    useEffect(
        () => {
            if (selectedPark < 0) {
                props.fetchBestParks();
                props.fetchCheapParks();
                props.fetchNearParks();
            }
            if (selectedPark >= 0) {
                props.fetchParkStatus(selectedPark);
                props.fetchParkInfo(selectedPark);
                props.fetchComments(selectedPark);
            }
        }, [selectedPark]
    )

    return (
        <Row>
            <Col sm='4' xs='12'>
                {parseInt(selectedPark) == -1 &&
                    <div class="park-list-tab">
                        <AppBar position="static" color="transparent">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                variant="fullWidth"
                                aria-label="full width tabs" >
                                <AntTab label="Tốt nhất" {...allyProps(0)} />
                                <AntTab label="Rẻ nhất" {...allyProps(1)} />
                                <AntTab label="Gần nhất" {...allyProps(2)} />
                            </Tabs>
                        </AppBar>
                        <Paper class="park-list-tab" style={{ maxHeight: 450, overflow: 'auto' }}>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value}
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel value={value} index={0} dir={theme.direction}>
                                    <Media list>
                                        <ParkList parks={props.best_parks} selectedPark={selectedPark} setSelectedPark={setSelectedPark} />
                                    </Media>
                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction}>
                                    <Media list>
                                        <ParkList parks={props.cheap_parks} />
                                    </Media>
                                </TabPanel>
                                <TabPanel value={value} index={2} dir={theme.direction}>
                                    <Media list>
                                        <ParkList parks={props.near_parks} />
                                    </Media>
                                </TabPanel>
                            </SwipeableViews>
                        </Paper>
                    </div>
                }
                {
                    parseInt(selectedPark) >= 0 && <div>
                        <ParkDetail
                            park_status={props.park_status}
                            park_info={props.park_info}
                            comments={props.comments}
                            postComment={props.postComment}
                            postReport={props.postReport}
                            selectedPark={selectedPark}
                            setSelectedPark={setSelectedPark} />
                    </div>
                }
            </Col>
            <Col sm='8' xs='12'>
                <Map
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCo-YmHUKxhqVQgaBmKNcRpbR86dhLGfd4&&callback=initMap&v=weekly`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `90vh`, margin: `auto` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    // lat={lat} lng={lng}
                />
            </Col>
        </Row>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(ParkListTabs);