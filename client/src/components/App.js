import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import FetchUsers from './FetchUsers';
import FetchExercises from './FetchExercises';
import UpdateUser from './UpdateUser';
import CreateUser from './CreateUser';
import CreateExercise from './CreateExercise';
import UpdateExercise from './UpdateExercise';
import FetchUser from './FetchUser';
import FetchExercise from './FetchExercise';
import ExerciseTrackerHomePageForm from './ExerciseTrackerHomePageForm';

const App = () => {
    return (
        <BrowserRouter>
            <div className="ui container">
                <ExerciseTrackerHomePageForm />
            </div>
            <Route exact path="/users" component={FetchUsers} />
            <Route exact path="/exercises" component={FetchExercises} />
            <Route path="/user/add" component={CreateUser} />
            <Route exact path="/user/update/:id" component={UpdateUser} />
            <Route path="/user/fetch/:id" component={FetchUser}/>
            <Route path="/exercise/add" component={CreateExercise} />
            <Route path="/exercise/update/:id" component={UpdateExercise}/>
            <Route path="/exercise/fetch/:id" component={FetchExercise}/>
        </BrowserRouter>
    );
};

export default App;