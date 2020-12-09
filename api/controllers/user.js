const UserService = require('../../services/user');

module.exports = {
    createUser: async (req, res) => {
        try {
            const response = await UserService.checkIfUserAlreadyExist(req.body);
            const { message, userAlreadyExist } = response;

            if (userAlreadyExist) {
                return res.status(403).json({
                    message
                });
            }

            const newUser = await UserService.createUser(
                req.body,
                req.file
            );

            res.status(201).json({
                newUser,
                success: "New user added"
            });
        } catch (error) {
            res.status(400).send({
                error: error
            });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).send({ users });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getUserById: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await UserService.getUserById(id);
            if (!user) {
                return res.status(404).send({
                    error: "User doesn't exist"
                });
            }
            res.status(200).send({ user });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params;

        try {
            const user = await UserService.deleteUserById(id);

            if (!user) {
                return res.status(404).json({
                    error: "User doesn't exist"
                });
            }

            res.status(200).send({
                success: "Deleting user successfully",
                user
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    updateUser: async (req, res) => {
        const { isValidUpdating, updates } = UserService.checkIfIsValidUpdating(req.body);

        if (!isValidUpdating) {
            return res.status(400).send({
                error: "Invalid updates"
            });
        }
        const { id } = req.params;

        try {
            const user = await UserService.findUpdatingUserById(id);
            if (!user) {
                return res.status(404).send();
            }

            updates.map(update => user[update] = req.body[update]);
            await UserService.saveUpdatingUser(user);

            res.status(200).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}