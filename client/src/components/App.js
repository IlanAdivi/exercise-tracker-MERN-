import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Users from './Users';
import Exercises from './Exercises';
import ExerciseTrackerHomePageForm from './ExerciseTrackerHomePageForm';

const App = () => {
    return (
        <BrowserRouter>
            <div className="ui container">
                <ExerciseTrackerHomePageForm />
            </div>
            <Route path="/users" component={Users} />
            <Route path="/exercises" component={Exercises} />
        </BrowserRouter>
    );
};

export default App;