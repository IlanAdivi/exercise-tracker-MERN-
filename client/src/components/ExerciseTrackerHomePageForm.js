import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseTrackerHomePageForm = () => {
  return (
    <div
      className="ui inverted fluid two item menu">
      <Link
        className="item"
        to="/users">
        Users
        </Link>
      <Link
        className="item"
        to="/exercises">
        Exercises
        </Link>
    </div>
  );
};

export default ExerciseTrackerHomePageForm;