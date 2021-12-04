import logo from './logo.svg';
import './App.css';
import Main from './components/NewParkComponent';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Parks from './components/Parks';
import InforWatching from './components/InforWatching';
// import UpdateInfor from './components/UpdateInfor'
// import Review from './components/Review'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/">
            <Parks />
          </Route>
          <Route path="/Main">
            <Main />
          </Route>
          <Route path="/InforWatching">
            <InforWatching />
          </Route>
          {/* <Route path="/Edit">
            <UpdateInfor />
          </Route>
          <Route path="/Review">
            <Review />
          </Route> */}
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
