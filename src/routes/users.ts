import express from "express";

const {
    getAllUsers,
    getUserById, 
    updateUser, 
    createUser, 
    deleteUser,
    getUserByTipo,
    login  
} = require('../controllers/userController/user');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

router.route('/:tipo').get(getUserByTipo);

router.route('/login').post(login)
module.exports = router;