////Reuseable functions 
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