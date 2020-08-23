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

const replaceString = (string, replaceValue, addValue) => {
    return string.replace(replaceValue, addValue);
};

module.exports = {
    dateOfExercise: ({ date }) => {
        // const now = moment();

        moment.locale('he')
        console.log(moment.locale());
        const dateOfInput = moment.utc(date).local().format('l'); 
        // console.log(moment.utc(date, 'DD/MM/YYYY').unix());
        // console.log(moment(input_date).format("dddd, MMMM Do YYYY h:mm:ss A"));
        console.log(dateOfInput);


        return dateOfInput;
        // const dateOfExerciseBeforeSlicing = createDate(date);
        // const dateOfExerciseAfterLocaleDateString = doLocaleDateString(dateOfExerciseBeforeSlicing);

        // return dateOfExerciseAfterLocaleDateString;
    },
    startTimeOfExercise: ({ startTime }) => {
        const startTimeBeforeSlicingDate = createDate(startTime);
        const startTimeOfExerciseAfterLocalHourString = doLocaleHourString(startTimeBeforeSlicingDate)
        const startTimeOfExerciseAfterSliceInString = doSliceInString(startTimeOfExerciseAfterLocalHourString, 0, 5);
        return startTimeOfExerciseAfterSliceInString;
    },
    endTimeOfExercise: ({ endTime }) => {
        const endTimeBeforeSlicingDate = createDate(endTime);
        const endimeOfExerciseAfterLocalHourString = doLocaleHourString(endTimeBeforeSlicingDate);
        const endTimeOfExerciseAfterSliceInString = doSliceInString(endimeOfExerciseAfterLocalHourString, 0, 5);
        return endTimeOfExerciseAfterSliceInString;
    },
    validDuration: (endTime, startTime) => {
        const endTimeAfterConvertToDate = createDate(endTime);
        const startTimeAfterConvertToDate = createDate(startTime);
        const endTimeAfterDoingLocalString = doLocaleHourString(endTimeAfterConvertToDate);
        const startTimeAfterDoingLocalString = doLocaleHourString(startTimeAfterConvertToDate);

        const endHourAfterSlice = doSliceInString(endTimeAfterDoingLocalString, 0, 2);
        const startTimeAfterSlice = doSliceInString(startTimeAfterDoingLocalString, 0, 2);

        let isValidDuration = false;

        const durationOfHours = calculateDifference(endHourAfterSlice, startTimeAfterSlice);

        if (durationOfHours > 0) {
            isValidDuration = true;
        } else {
            if (durationOfHours === 0) {
                const endMinutes = doSliceInString(endTimeAfterDoingLocalString, 3, 5);
                const startMinutes = doSliceInString(startTimeAfterDoingLocalString, 3, 5);
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
    }
}