import logo from './logo.svg';
import './App.css';
import Main from './components/NewParkComponent';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Parks from './components/Parks';
import InforWatching from './components/InforWatching';
import UpdateInfor from './components/UpdateInfor';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { RemovePark } from './components/RemovePark';
import { Status } from './Status/Status';
import { Review } from './components/ReviewComponent';


const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <Parks />
            </Route>
            <Route path="/Main">
              <Main />

            </Route>
            <Route path="/InforWatching/:id">
              <InforWatching />
            </Route>
            <Route path="/Update/:id">
              <UpdateInfor />
            </Route>
            <Route path="/status/:id">
              <Status />
            </Route>
            <Route path="/Delete/:id">
              <RemovePark />
            </Route>
            <Route path="/Review/:id">
              <Review />
            </Route>
          </Switch>

        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
