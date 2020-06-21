module.exports = {
    dateOfExercise: ({ date }) => {
        const dateOfExerciseBeforeSlicing = new Date(date);
        const dateOfExerciseAfterSlicing = dateOfExerciseBeforeSlicing.toLocaleDateString();
        // console.log(dateOfExerciseAfterSlicing.slice(0, 10));

        return dateOfExerciseAfterSlicing.slice(0, 10);
    },
    startTimeOfExercise: ({ startTime }) => {
        const startTimeBeforeSlicing = new Date(startTime);
        // console.log(startTime);
        const startTimeOfExerciseAfterSlicing = startTimeBeforeSlicing.toLocaleTimeString();

        return startTimeOfExerciseAfterSlicing.slice(0, 5);
    },
    endTimeOfExercise: ({ endTime }) => {
        const endTimeBeforeSlicing = new Date(endTime);
        const endTimeOfExerciseAfterSlicing = endTimeBeforeSlicing.toLocaleTimeString();

        return endTimeOfExerciseAfterSlicing.slice(0, 5);
    }
}