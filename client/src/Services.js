export const isEmpty = item => {
    let countOfEmptyItemProperties = 0;

    Object.keys(item).map(itemPropeties => {
        if (item[itemPropeties] === '' ||
            item[itemPropeties] === null ||
            item[itemPropeties] === undefined) {
            countOfEmptyItemProperties++;
        }
        return countOfEmptyItemProperties;
    });

    return countOfEmptyItemProperties > 0 ? true : false;
};