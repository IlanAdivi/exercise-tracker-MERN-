import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Users from './Users';
import Exercises from './Exercises';
import UpdateUser from './UpdateUser';
import CreateExercise from './CreateExercise';
import UpdateExercise from './UpdateExercise';
import ExerciseTrackerHomePageForm from './ExerciseTrackerHomePageForm';

const App = () => {
    return (
        <BrowserRouter>
            <div className="ui container">
                <ExerciseTrackerHomePageForm />
            </div>
            <Route exact path="/users" component={Users} />
            <Route exact path="/exercises" component={Exercises} />
            <Route path="/users/:id" component={UpdateUser} />
            <Route path="/exercise/add" component={CreateExercise} />
            <Route path="/exercises/:id" component={UpdateExercise}/>
        </BrowserRouter>
    );
};

export default App;