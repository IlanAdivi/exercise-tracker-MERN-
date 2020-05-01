const User = require('../models/user').User;

module.exports = {
    createUser: async user => {
        const { firstname, lastname, kind, phone } = user;

        user = new User({
            firstname,
            lastname,
            kind,
            phone
        });

        console.log(user);

        await user.save();
    },
    checkIfUserAlreadyExist: async user => {
        const count = await User.countDocuments(user);
        if (count > 0) {
            return {
                message: "user already exist",
                userAlreadyExist: true
            };
        }
        return {
            userAlreadyExist: false
        }
    },
    getAllUsers: async () => {
        const users = await User.find();
        if (users.length === 0) {
            return {
                message: "There is no users now"
            }
        }
        return users;
    },
    getUserById: async id => {
        user = await User.findById(id);
        return user;
    },
    deleteUserById: async id => {
        const user = await User.findByIdAndDelete(id);
        return user;
    },
    findUpdatingUserById: async id => {
        const user = await User.findByIdAndUpdate(id);
        return user;
    },
    saveUpdatingUser: async user => {
        await user.save();
    },
    checkIfIsValidUpdating: userRequestBody => {
        updates = Object.keys(userRequestBody);
        const allowedUpdates = ['phone'];

        const isValidUpdating = updates.every(updateUser =>
            allowedUpdates.includes(updateUser));

        return {
            isValidUpdating,
            updates: isValidUpdating === true ? updates : null
        }
    }
}