const moment = require("moment");

const doLocaleDateString = dateBeforeDoingLocalString => {
    const dateAfterDoingLocalString = dateBeforeDoingLocalString.toLocaleDateString();
    return dateAfterDoingLocalString;
};

const doLocaleHourString = HourBeforeDoingLocalString => {
    const dateAfterDoingLocalString = HourBeforeDoingLocalString.toLocaleTimeString();
    return dateAfterDoingLocalString;
};

const createDate = string => {
    const date = new Date(string);
    return date;
};

const calculateDifference = (end, start) => {
    const result = end - start;
    return result;
};

const findSemicolon = (string) => {
    const indexOfSemicolon = string.indexOf(':');
    return indexOfSemicolon;
};

const timeOfExercise = time => {
    const timeOfInput = moment.utc(time).local().format('LT');
    if (timeOfInput.includes('AM') === false &&
        timeOfInput.includes('PM') === false) {
        return timeOfInput;
    }

    const indexOfSemicolon = findSemicolon(timeOfInput);
    const hourOftimeOfInputAfterSlice = timeOfInput.slice(0, indexOfSemicolon);
    const timeOfInputAfterSlicing = hourOftimeOfInputAfterSlice < 10 ?
        `0${timeOfInput.substr(0, timeOfInput.length - 2)}`
        :
        `${timeOfInput.substr(0, timeOfInput.length - 2)}`
        ;

    if (timeOfInput.includes('AM')) {
        return timeOfInputAfterSlicing;
    } else if (timeOfInput.includes('PM')) {
        const newHourOfTimeOfInputAfterSlice = Number(hourOftimeOfInputAfterSlice) + 12;
        const timeOfInputWithoutOldHour = timeOfInput.slice(indexOfSemicolon, timeOfInput.length - 2);
        const newTimeOfInputAfterSlicing = `${newHourOfTimeOfInputAfterSlice}${timeOfInputWithoutOldHour}`;
        return newTimeOfInputAfterSlicing;
    }
};

const startTimeOfExercise = ({ startTime }) => {
    return timeOfExercise(startTime);
};

const endTimeOfExercise = ({ endTime }) => {
    return timeOfExercise(endTime);
}

const dateOfExercise = ({ date }) => {
    moment.locale('he')
    const dateOfInput = moment.utc(date).local().format('l');
    const newDateOfInput = dateOfInput.split('/').join('.');
    // console.log(newDateOfInput);
    return newDateOfInput;
};

module.exports = {
    // dateOfExercise: ({ date }) => {
    //     moment.locale('he')
    //     const dateOfInput = moment.utc(date).local().format('l');
    //     const newDateOfInput = dateOfInput.split('/').join('.');
    //     // console.log(newDateOfInput);
    //     return newDateOfInput;
    // },
    validDuration: (endTime, startTime) => {
        const endTimeAfterConvertToDate = createDate(endTime);
        const startTimeAfterConvertToDate = createDate(startTime);
        const endTimeAfterDoingLocalString = doLocaleHourString(endTimeAfterConvertToDate);
        // console.log(endTimeAfterDoingLocalString);
        const startTimeAfterDoingLocalString = doLocaleHourString(startTimeAfterConvertToDate);
        // console.log(startTimeAfterDoingLocalString);



        // console.log(endTime);
        const hourOfEndTime = timeOfExercise(endTime);
        // console.log(hourOfEndTime);
        const hourOfStartTime = timeOfExercise(startTime);
        // console.log(hourOfStartTime);
        const endHourAfterSlice = hourOfEndTime.slice(0, 2);
        // console.log(endHourAfterSlice);
        const startTimeAfterSlice = hourOfStartTime.slice(0, 2);
        // console.log(startTimeAfterSlice);

        let isValidDuration = false;

        const durationOfHours = calculateDifference(endHourAfterSlice, startTimeAfterSlice);

        if (durationOfHours > 0) {
            isValidDuration = true;
        } else {
            if (durationOfHours === 0) {
                const endMinutes = hourOfEndTime.slice(3, 5);
                const startMinutes = hourOfStartTime.slice(3, 5);
                const durationOfMinutes = calculateDifference(endMinutes, startMinutes);

                if (durationOfMinutes > 0) {
                    isValidDuration = true;
                } else {
                    isValidDuration = false;
                }

            } else {
                isValidDuration = false;
            }
        }

        return isValidDuration;
    },
    validDate: dateOfInput => {
        let isValidDate = false;
        // const startTimeOfExerciseBeforeLocaleTimeString = createDate(dateOfInput.startTime);
        const dateOfExerciseFromClient = createDate(dateOfInput.date);

        console.log(dateOfInput.startTime);

        const dateOfToday = new Date;
        console.log(dateOfToday);
        const dateOfTodayAfterParsing = Date.parse(dateOfToday);
        // console.log(dateOfTodayAfterParsing);
        const dateOfExerciseAfterParsing = Date.parse(dateOfExerciseFromClient);
        // console.log(dateOfExerciseAfterParsing);

        // const dateOfTodayAfterLocaleDateString = doLocaleDateString(dateOfToday);
        // console.log(dateOfTodayAfterLocaleDateString);
        const dateOfTodayAfterLocaleDate = dateOfExercise(dateOfToday);
        // console.log(dateOfTodayAfterLocaleDate);

        // const dateOfExerciseAfterLocaleDateString = doLocaleDateString(dateOfExerciseFromClient)
        // console.log(dateOfExerciseAfterLocaleDateString);

        const dateOfExerciseAfterLocaleDate = dateOfExercise(dateOfInput);
        // console.log(dateOfExerciseAfterLocaleDate);

        // const startTimeOfExerciseAfterLocaleTimeString = doLocaleHourString(startTimeOfExerciseBeforeLocaleTimeString);
        // console.log(startTimeOfExerciseAfterLocaleTimeString);

        const startTimeOfExerciseFromInput = startTimeOfExercise(dateOfInput);
        // console.log(startTimeOfExerciseFromInput);

        // const timeOfDayAfterLocaleTimeString = doLocaleHourString(dateOfToday);
        // console.log(hourOfTodayAfterLocaleTimeString);

        const timeOfDay = timeOfExercise(dateOfToday);
        // console.log(timeOfDay);


        const startTimeOfExerciseWithoutColon = startTimeOfExerciseFromInput.replace(/:/g, '');
        // console.log(startTimeOfExerciseWithoutColon);
        const timeOfDayWithoutColon = timeOfDay.replace(/:/g, '');
        // console.log(timeOfDayWithoutColon);

        if (dateOfExerciseAfterLocaleDate === dateOfTodayAfterLocaleDate) {
            if (startTimeOfExerciseWithoutColon < timeOfDayWithoutColon) {
                isValidDate = false;
                return isValidDate;
            } else {
                isValidDate = true;
                return isValidDate;
            }
        }

        if (dateOfExerciseAfterParsing < dateOfTodayAfterParsing) {
            isValidDate = false;
        } else {
            isValidDate = true;
        }

        return isValidDate;
    },
    startTimeOfExercise,
    endTimeOfExercise,
    dateOfExercise
}