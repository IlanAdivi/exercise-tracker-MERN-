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

const doSliceInString = (stringBeforeSlicing, startIndex, endIndex) => {
    const stringAfterSlicing = stringBeforeSlicing.slice(startIndex, endIndex);
    return stringAfterSlicing;
};

const calculateDifference = (end, start) => {
    const result = end - start;
    return result;
};

// const checkingLessThanTen = hourOfInput => {
//     let isLessThanTen = true;
//     if (hourOfInput >= 10) {
//         isLessThanTen = false;
//     } else {
//         isLessThanTen = true;
//     }

//     return isLessThanTen;
// };

const replaceString = (string, replaceValue, addValue) => {
    return string.replace(replaceValue, addValue);
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

module.exports = {
    dateOfExercise: ({ date }) => {
        // const now = moment();

        moment.locale('he')
        // console.log(moment.locale());
        const dateOfInput = moment.utc(date).local().format('l');
        // console.log(moment.utc(date, 'DD/MM/YYYY').unix());
        // console.log(moment(input_date).format("dddd, MMMM Do YYYY h:mm:ss A"));
        const newDateOfInput = dateOfInput.split('/').join('.');
        console.log(newDateOfInput);
        return newDateOfInput;
        // const dateOfExerciseBeforeSlicing = createDate(date);
        // const dateOfExerciseAfterLocaleDateString = doLocaleDateString(dateOfExerciseBeforeSlicing);

        // return dateOfExerciseAfterLocaleDateString;
    },
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
    validDate: item => {
        let isValidDate = false;
        const startTimeOfExerciseBeforeLocaleTimeString = createDate(item.startTime);
        const dateOfExerciseFromClient = createDate(item.date);

        const dateOfToday = new Date;
        const dateOfTodayAfterParsing = Date.parse(dateOfToday);
        const dateOfExerciseAfterParsing = Date.parse(dateOfExerciseFromClient);

        const dateOfTodayAfterLocaleDateString = doLocaleDateString(dateOfToday);
        const dateOfExerciseAfterLocaleDateString = doLocaleDateString(dateOfExerciseFromClient)

        const startTimeOfExerciseAfterLocaleTimeString = doLocaleHourString(startTimeOfExerciseBeforeLocaleTimeString);
        const hourOfTodayAfterLocaleTimeString = doLocaleHourString(dateOfToday);

        const startTimeOfExerciseWithoutColon = replaceString(startTimeOfExerciseAfterLocaleTimeString, /:/g, '');
        const hourOfTodayWithoutColon = replaceString(hourOfTodayAfterLocaleTimeString, /:/g, '');

        if (dateOfExerciseAfterLocaleDateString === dateOfTodayAfterLocaleDateString) {
            if (startTimeOfExerciseWithoutColon < hourOfTodayWithoutColon) {
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
    endTimeOfExercise
}