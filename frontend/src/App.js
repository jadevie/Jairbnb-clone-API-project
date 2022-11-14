import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';
import GetAllSpots from './components/GetAllSpots';

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
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/spots">
            <GetAllSpots />
          </Route>
          <Route exact path="/">
            <GetAllSpots />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
