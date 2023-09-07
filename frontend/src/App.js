import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';
import GetAllSpots from './components/GetAllSpots';
import CreateSpotForm from './components/CreateSpotForm';
import SpotDetails from './components/SpotDetails';
import ErrorPage from './components/ErrorPage/ErrorPage';
import { AllTrips } from './components/AllTrips/AllTrips';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/spots/:spotId'>
            <SpotDetails />
          </Route>
          <Route exact path='/trips'>
            <AllTrips />
          </Route>
          <Route exact path='/hosting'>
            <CreateSpotForm />
          </Route>
          <Route exact path="/">
            <GetAllSpots />
          </Route>
          <Route>
            <ErrorPage />
            <Redirect to='/404' />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
