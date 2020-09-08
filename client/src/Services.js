////Reuseable functions 

////This function will checked if all of the input fields are filled.
////returning true when all of the input fields are filled, otherwise false.
export const isAllFilled = item => {
    let countOfEmptyItemProperties = 0;

    Object.keys(item).map(itemPropeties => {
        if (item[itemPropeties] === '' ||
            item[itemPropeties] === undefined) {
            countOfEmptyItemProperties++;
        }
        return countOfEmptyItemProperties;
    });

    return countOfEmptyItemProperties > 0 ? true : false;
};

////This function will checked if there is exist at least one or more of the input fields that are filled.
////returning true when exist at least one or more of the input fields that are filled, otherwise false.
export const isBlankForm = item => {
    let countOfFilledItemProperties = 0;

    Object.keys(item).map(itemPropeties => {
        if (item[itemPropeties] !== '' &&
            item[itemPropeties] !== undefined) {
            countOfFilledItemProperties++;
        }

        return countOfFilledItemProperties;
    });

    return countOfFilledItemProperties === 0 ? true : false;
};

export const findEmptyFieldsInCreatingUser = (values, errors) => {
    Object.keys(values).map(key => {
        if (values[key] === '' &&
            key !== 'image') {
            errors[key] = `Field ${key} is required`;
        }

        return key;
    });

    return errors;
};

export const findEmptyFieldsInUpdatingUser = (values, errors) => {
    Object.keys(values).map(key => {
        if (values[key] === '') {
            errors[key] = `Field ${key} is required`;
        }

        return key;
    });

    return errors;
};