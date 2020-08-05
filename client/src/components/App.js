import React from 'react';
import { Router, Route } from 'react-router-dom';

import FetchUsers from './users/FetchUsers';
import FetchExercises from './exercises/FetchExercises';
import UpdateUser from './users/UpdateUser';
import CreateUser from './users/CreateUser';
import ConfirmUser from './users/ConfirmUser';
import CreateExercise from './exercises/CreateExercise';
import UpdateExercise from './exercises/UpdateExercise';
import FetchUser from './users/FetchUser';
import FetchExercise from './exercises/FetchExercise';
import ExerciseTrackerHomePageForm from './ExerciseTrackerHomePageForm';
import history from './History';

const App = () => {
    return (
        <Router history={history}>
            <br />
            <ExerciseTrackerHomePageForm />
            <div className="ui container">
            </div>
            <Route exact path="/users" component={FetchUsers} />
            <Route exact path="/exercises" component={FetchExercises} />
            <Route path="/user/add/confirm" component={ConfirmUser} />
            <Route exact path="/user/add" component={CreateUser} />
            <Route exact path="/user/update/:id" component={UpdateUser} />
            <Route path="/user/fetch/:id" component={FetchUser} />
            <Route path="/exercise/add" component={CreateExercise} />
            <Route path="/exercise/update/:id" component={UpdateExercise} />
            <Route path="/exercise/fetch/:id" component={FetchExercise} />
        </Router>
    );
};

export default App;