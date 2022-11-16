import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';
import GetAllSpots from './components/GetAllSpots';
import CreateSpotForm from './components/CreateSpotForm';
import SpotDetails from './components/SpotDetails';
import CreateReview from './components/CreateReview/CreateReview';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // const allSpots = useSelector(state => state.spots);
  // console.log("__________", allSpots);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/spots/:spotId'>
            <SpotDetails />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/spots">
            <GetAllSpots />
          </Route>
          <Route exact path='/hosting'>
            <CreateSpotForm />
          </Route>
          <Route exact path="/">
            <GetAllSpots />
          </Route>
          <Route>
            <h1>Oops!</h1>
            <p>We can't seem to find the page you're looking for.</p>
            <p>Error code: 404</p>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
