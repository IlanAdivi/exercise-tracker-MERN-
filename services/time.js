const moment = require("moment");

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
    return newDateOfInput;
};

module.exports = {
    validDuration: (endTime, startTime) => {
        const hourOfEndTime = timeOfExercise(endTime);
        const hourOfStartTime = timeOfExercise(startTime);
        const endHourAfterSlice = hourOfEndTime.slice(0, 2);
        const startTimeAfterSlice = hourOfStartTime.slice(0, 2);
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
        const dateOfExerciseFromClient = createDate(dateOfInput.date);
        const dateOfToday = new Date;
        const dateOfTodayAfterParsing = Date.parse(dateOfToday);
        const dateOfExerciseAfterParsing = Date.parse(dateOfExerciseFromClient);
        const dateOfTodayAfterLocaleDate = dateOfExercise(dateOfToday);
        const dateOfExerciseAfterLocaleDate = dateOfExercise(dateOfInput);
        const startTimeOfExerciseFromInput = startTimeOfExercise(dateOfInput);
        const timeOfDay = timeOfExercise(dateOfToday);
        const startTimeOfExerciseWithoutColon = startTimeOfExerciseFromInput.replace(/:/g, '');
        const timeOfDayWithoutColon = timeOfDay.replace(/:/g, '');

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