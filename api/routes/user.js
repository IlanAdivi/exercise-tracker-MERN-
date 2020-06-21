const userController = require('../controllers/user');
const express = require('express');
const router = express.Router();
const upload = require('../../services/multer');

//Routes for users
router.post('/users', upload.single("image"), userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', userController.deleteUser);
router.patch('/users/:id', userController.updateUser);

module.exports = router;